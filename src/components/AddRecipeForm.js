import { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup, Badge } from 'react-bootstrap';
import axios from 'axios';

export const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState({ large: '', medium: '', small: '' });
  const [ingredients, setIngredients] = useState({ ingredient1: '', ingredient2: '' });
  const [steps, setSteps] = useState(['']);
  const [tip, setTip] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAddStep = () => setSteps([...steps, '']);
  const handleRemoveStep = (index) => setSteps(steps.filter((_, i) => i !== index));
  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  const handleTagKeyPress = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('categoryLarge', category.large);
    formData.append('categoryMedium', category.medium);
    formData.append('categorySmall', category.small);
    formData.append('ingredient1', ingredients.ingredient1);
    formData.append('ingredient2', ingredients.ingredient2);
    formData.append('steps', JSON.stringify(steps));
    formData.append('tip', tip);
    formData.append('tags', JSON.stringify(tags));

    try {
      const res = await axios.post(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/recipe/add`, formData);
      alert('레시피가 등록되었습니다!');
    } catch (err) {
      console.error(err);
      alert('등록 중 에러가 발생했습니다.');
    }
  };

  return (
    <Container>
      <h3>레시피 작성하기</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>레시피명</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>사진 업로드</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="preview" style={{ width: '100%', marginTop: '10px' }} />}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>소개</Form.Label>
          <Form.Control as="textarea" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Select onChange={(e) => setCategory({ ...category, large: e.target.value })}>
              <option>대분류 선택</option>
              <option value="한식">한식</option>
              <option value="양식">양식</option>
              <option value="중식">중식</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select onChange={(e) => setCategory({ ...category, medium: e.target.value })}>
              <option>중분류 선택</option>
              <option value="밥">밥</option>
              <option value="면">면</option>
              <option value="반찬">반찬</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select onChange={(e) => setCategory({ ...category, small: e.target.value })}>
              <option>소분류 선택</option>
              <option value="간단">간단</option>
              <option value="이색">이색</option>
              <option value="정통">정통</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>재료 1</Form.Label>
            <Form.Control type="text" value={ingredients.ingredient1} onChange={(e) => setIngredients({ ...ingredients, ingredient1: e.target.value })} />
          </Col>
          <Col>
            <Form.Label>재료 2</Form.Label>
            <Form.Control type="text" value={ingredients.ingredient2} onChange={(e) => setIngredients({ ...ingredients, ingredient2: e.target.value })} />
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>만드는 방법</Form.Label>
          {steps.map((step, index) => (
            <InputGroup className="mb-2" key={index}>
              <InputGroup.Text>{index + 1}</InputGroup.Text>
              <Form.Control
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                placeholder="예: 냄비에 물을 끓인다."
              />
              <Button variant="outline-danger" onClick={() => handleRemoveStep(index)}>삭제</Button>
            </InputGroup>
          ))}
          <Button variant="outline-primary" onClick={handleAddStep}>+ 단계 추가</Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>팁</Form.Label>
          <Form.Control 
          as="textarea"
          rows={3}
          value={tip} 
          onChange={(e) => setTip(e.target.value)}
          style={{ resize: 'none' }}
          placeholder="예: 간장을 너무 많이 넣지 않도록 주의하세요!"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>태그 (쉼표로 구분)</Form.Label>
          <Form.Control
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyPress}
          />
          <div className="mt-2">
            {tags.map((tag, idx) => (
              <Badge bg="secondary" key={idx} className="me-1">{tag}</Badge>
            ))}
          </div>
        </Form.Group>

        <Button variant="danger" type="submit">레시피 등록하기</Button>
      </Form>
    </Container>
  );
};