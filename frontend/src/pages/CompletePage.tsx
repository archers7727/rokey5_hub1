import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, RotateCcw, Clock } from 'lucide-react';
import { useJobStore } from '../store/jobStore';

export default function CompletePage() {
  const navigate = useNavigate();
  const { currentJob, resetSelection } = useJobStore();

  if (!currentJob) {
    navigate('/');
    return null;
  }

  const handleNewJob = () => {
    resetSelection();
    navigate('/material');
  };

  const handleGoHome = () => {
    resetSelection();
    navigate('/');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${secs.toString().padStart(2, '0')}초`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-2xl w-full">
        {/* 완료 아이콘 */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30 animate-pulse" />
            <CheckCircle
              size={120}
              className="text-green-500 relative animate-bounce"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* 완료 메시지 */}
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          작업 완료!
        </h1>
        <p className="text-center text-gray-600 mb-12">
          재료 손질이 성공적으로 완료되었습니다
        </p>

        {/* 결과 요약 */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-200">
            결과 요약
          </h2>

          <div className="space-y-4">
            {/* 재료 정보 */}
            <div className="flex items-center gap-4">
              <span className="text-5xl">{currentJob.material.image}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-600">재료</p>
                <p className="text-xl font-semibold">{currentJob.material.name}</p>
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            {/* 모드 정보 */}
            <div>
              <p className="text-sm text-gray-600">손질 모드</p>
              <p className="text-xl font-semibold">{currentJob.mode.name}</p>
              {currentJob.mode.mmSize && (
                <p className="text-primary-600">{currentJob.mode.mmSize}</p>
              )}
            </div>

            <div className="h-px bg-gray-200" />

            {/* 작업 시간 */}
            <div className="flex items-center gap-2">
              <Clock className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-600">작업 시간</p>
                <p className="text-xl font-semibold">
                  {formatTime(currentJob.elapsedTime)}
                </p>
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            {/* 상태 */}
            <div>
              <p className="text-sm text-gray-600">상태</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <p className="text-xl font-semibold text-green-600">정상 완료</p>
              </div>
            </div>
          </div>
        </div>

        {/* 완료된 재료 이미지 영역 */}
        <div className="card mb-8 bg-gray-50">
          <div className="aspect-video flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <span className="text-8xl block mb-4">{currentJob.material.image}</span>
              <p className="text-gray-500">완료된 재료</p>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-4">
          <button
            onClick={handleNewJob}
            className="btn-primary flex-1 flex items-center justify-center gap-2 py-4"
          >
            <RotateCcw size={20} />
            <span>새 작업 시작</span>
          </button>

          <button
            onClick={handleGoHome}
            className="btn-secondary flex-1 flex items-center justify-center gap-2 py-4"
          >
            <Home size={20} />
            <span>홈으로</span>
          </button>
        </div>
      </div>
    </div>
  );
}
