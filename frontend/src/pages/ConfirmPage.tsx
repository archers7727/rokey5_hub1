import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, Clock, AlertTriangle } from 'lucide-react';
import { useJobStore } from '../store/jobStore';

export default function ConfirmPage() {
  const navigate = useNavigate();
  const { selectedMaterial, selectedMode, startJob } = useJobStore();

  if (!selectedMaterial || !selectedMode) {
    navigate('/material');
    return null;
  }

  const handleStartJob = () => {
    startJob();
    navigate('/monitor');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/mode')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={24} />
            <span>뒤로</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">작업 확인</h1>
          <div className="w-20" />
        </div>

        {/* 작업 요약 */}
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-200">
            작업 요약
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-5xl">{selectedMaterial.image}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-600">재료</span>
                </div>
                <p className="text-xl font-semibold">{selectedMaterial.name}</p>
                <p className="text-gray-600">{selectedMaterial.description}</p>
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-600">손질 모드</span>
              </div>
              <p className="text-xl font-semibold">{selectedMode.name}</p>
              {selectedMode.mmSize && (
                <p className="text-primary-600">{selectedMode.mmSize}</p>
              )}
              <p className="text-gray-600">{selectedMode.description}</p>
            </div>

            <div className="h-px bg-gray-200" />

            <div className="flex items-center gap-2">
              <Clock className="text-gray-400" size={20} />
              <div>
                <span className="text-sm text-gray-600">예상 작업 시간</span>
                <p className="text-lg font-semibold">약 3분</p>
              </div>
            </div>
          </div>
        </div>

        {/* 안전 확인사항 */}
        <div className="card mb-8 bg-yellow-50 border-2 border-yellow-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-yellow-600" size={24} />
            <h2 className="text-xl font-semibold text-yellow-900">안전 확인사항</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="mt-1 w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700 group-hover:text-gray-900">
                재료가 올바르게 배치되었나요?
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="mt-1 w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700 group-hover:text-gray-900">
                로봇 작업 영역에 사람이 없나요?
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="mt-1 w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700 group-hover:text-gray-900">
                비상정지 버튼 위치를 확인했나요?
              </span>
            </label>
          </div>
        </div>

        {/* 실행 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handleStartJob}
            className="btn-primary flex items-center gap-3 text-xl py-6 px-16 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <PlayCircle size={28} />
            작업 실행
          </button>
        </div>
      </div>
    </div>
  );
}
