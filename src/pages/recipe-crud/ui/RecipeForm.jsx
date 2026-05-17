import { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup, Badge } from 'react-bootstrap';

const CATEGORY_OPTIONS = {
  large: ['한식', '양식', '중식', '일식', '디저트'],
  medium: ['케이크', '쿠키', '빵', '파이', '푸딩'],
  small: ['간단', '이색', '정통'],
};

export const RecipeForm = ({ initialData = {}, onSubmit, loading, submitLabel = '등록하기' }) => {
  const [title, setTitle] = useState(initialData.recipe_name || '');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(initialData.recipe_image || null);
  const [description, setDescription] = useState(initialData.recipe_intro || '');
  const [category, setCategory] = useState({
    large: initialData.category_big || '',
    medium: initialData.category_middle || '',
    small: initialData.category_machine || '',
  });
  const [ingredients, setIngredients] = useState({
    ingredient1: initialData.ingredient1 || '',
    ingredient2: initialData.ingredient2 || '',
  });
  const [steps, setSteps] = useState(
    initialData.steps?.length > 0 ? initialData.steps : ['']
  );
  const [tip, setTip] = useState(initialData.tips || '');
  const [tags, setTags] = useState(() => {
    if (!initialData.tags) return [];
    try { return JSON.parse(initialData.tags); } catch { return []; }
  });
  const [tagInput, setTagInput] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAddStep = () => setSteps([...steps, '']);
  const handleRemoveStep = (index) => setSteps(steps.filter((_, i) => i !== index));
  const handleStepChange = (index, value) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) setTags([...tags, newTag]);
      setTagInput('');
    }
  };
  const handleRemoveTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, image, description, category, ingredients, steps, tip, tags });
  };

  return (
    <Container className="py-4" style={{ maxWidth: '600px' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>레시피명 *</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="레시피 이름을 입력하세요"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>사진 업로드</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{ width: '100%', marginTop: '10px', borderRadius: '8px' }}
            />
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>소개</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="레시피를 간단히 소개해주세요"
          />
        </Form.Group>

        <Row className="mb-3">
          {['large', 'medium', 'small'].map((key, i) => (
            <Col key={key}>
              <Form.Select
                value={category[key]}
                onChange={(e) => setCategory({ ...category, [key]: e.target.value })}
              >
                <option value="">{['대분류', '중분류', '소분류'][i]} 선택</option>
                {CATEGORY_OPTIONS[key].map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </Form.Select>
            </Col>
          ))}
        </Row>

        <Row className="mb-3">
          {['ingredient1', 'ingredient2'].map((key, i) => (
            <Col key={key}>
              <Form.Label>재료 {i + 1}</Form.Label>
              <Form.Control
                type="text"
                value={ingredients[key]}
                onChange={(e) => setIngredients({ ...ingredients, [key]: e.target.value })}
                placeholder={`재료 ${i + 1}`}
              />
            </Col>
          ))}
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
              <Button variant="outline-danger" onClick={() => handleRemoveStep(index)}>
                삭제
              </Button>
            </InputGroup>
          ))}
          <Button variant="outline-primary" size="sm" onClick={handleAddStep}>
            + 단계 추가
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>팁</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            placeholder="예: 버터는 실온에 미리 꺼내두세요!"
            style={{ resize: 'none' }}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>태그 (쉼표 또는 Enter로 구분)</Form.Label>
          <Form.Control
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="예: 초코, 바닐라"
          />
          <div className="mt-2 d-flex flex-wrap gap-1">
            {tags.map((tag, idx) => (
              <Badge
                bg="secondary"
                key={idx}
                style={{ cursor: 'pointer' }}
                onClick={() => handleRemoveTag(tag)}
              >
                {tag} ✕
              </Badge>
            ))}
          </div>
        </Form.Group>

        <Button variant="danger" type="submit" disabled={loading} className="w-100">
          {loading ? '처리 중...' : submitLabel}
        </Button>
      </Form>
    </Container>
  );
};
