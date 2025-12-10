import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Scissors, Grid3x3, Loader } from 'lucide-react';
import { useJobStore } from '../store/jobStore';
import { processingModes, getModesByType } from '../data/processingModes';
import type { ProcessingType } from '../types';

const processingTypes: { value: ProcessingType; label: string; icon: any }[] = [
  { value: 'slice', label: '썰기', icon: Scissors },
  { value: 'dice', label: '다지기', icon: Grid3x3 },
  { value: 'peel', label: '박피', icon: Loader },
];

export default function ModePage() {
  const navigate = useNavigate();
  const { selectedMaterial, selectedMode, setSelectedMode } = useJobStore();

  if (!selectedMaterial) {
    navigate('/material');
    return null;
  }

  const handleModeSelect = (modeId: string) => {
    const mode = processingModes.find((m) => m.id === modeId);
    setSelectedMode(mode || null);
  };

  const handleNext = () => {
    if (selectedMode) {
      navigate('/confirm');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/material')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={24} />
            <span>뒤로</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">손질 모드 선택</h1>
          <div className="w-20" />
        </div>

        {/* 선택한 재료 표시 */}
        <div className="card mb-8">
          <p className="text-sm text-gray-600 mb-2">선택한 재료</p>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{selectedMaterial.image}</span>
            <div>
              <h3 className="text-xl font-semibold">{selectedMaterial.name}</h3>
              <p className="text-gray-600">{selectedMaterial.description}</p>
            </div>
          </div>
        </div>

        {/* 손질 모드 */}
        <div className="space-y-6 mb-8">
          {processingTypes.map((type) => {
            const modes = getModesByType(type.value);
            const Icon = type.icon;

            return (
              <div key={type.value} className="card">
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="text-primary-600" size={24} />
                  <h2 className="text-xl font-semibold">{type.label} 모드</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {modes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => handleModeSelect(mode.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedMode?.id === mode.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">{mode.name}</h3>
                          {mode.mmSize && (
                            <p className="text-sm text-primary-600 mb-1">
                              {mode.mmSize}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">{mode.description}</p>
                        </div>
                        {selectedMode?.id === mode.id && (
                          <div className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 다음 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedMode}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
              selectedMode
                ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>작업 확인</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
