import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useJobStore } from '../store/jobStore';
import { materials, getMaterialsByCategory } from '../data/materials';
import type { MaterialCategory } from '../types';

const categories: { value: MaterialCategory; label: string }[] = [
  { value: 'meat', label: '육류' },
  { value: 'vegetable', label: '채소' },
  { value: 'fruit', label: '과일' },
];

export default function MaterialPage() {
  const navigate = useNavigate();
  const { selectedMaterial, setSelectedMaterial } = useJobStore();
  const [activeCategory, setActiveCategory] = useState<MaterialCategory>('vegetable');

  const categoryMaterials = getMaterialsByCategory(activeCategory);

  const handleMaterialSelect = (materialId: string) => {
    const material = materials.find((m) => m.id === materialId);
    setSelectedMaterial(material || null);
  };

  const handleNext = () => {
    if (selectedMaterial) {
      navigate('/mode');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={24} />
            <span>뒤로</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">재료 선택</h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>

        {/* 카테고리 탭 */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-6 py-3 font-semibold transition-colors relative ${
                activeCategory === cat.value
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {cat.label}
              {activeCategory === cat.value && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
              )}
            </button>
          ))}
        </div>

        {/* 재료 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {categoryMaterials.map((material) => (
            <button
              key={material.id}
              onClick={() => handleMaterialSelect(material.id)}
              className={`material-card ${
                selectedMaterial?.id === material.id ? 'material-card-selected' : ''
              }`}
            >
              <div className="text-6xl mb-3 text-center">{material.image}</div>
              <h3 className="font-semibold text-center mb-1">{material.name}</h3>
              <p className="text-sm text-gray-600 text-center">{material.description}</p>
            </button>
          ))}
        </div>

        {/* 다음 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedMaterial}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
              selectedMaterial
                ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>다음 단계</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
