import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pause, Play, StopCircle, Activity } from 'lucide-react';
import { useJobStore } from '../store/jobStore';
import { useRobotStore } from '../store/robotStore';

export default function MonitorPage() {
  const navigate = useNavigate();
  const { currentJob, updateJobProgress, pauseJob, resumeJob, completeJob } = useJobStore();
  const { jointAngles, force, speed } = useRobotStore();
  const [isPaused, setIsPaused] = useState(false);

  // Mock 진행률 업데이트 (실제로는 WebSocket으로 백엔드에서 받아옴)
  useEffect(() => {
    if (!currentJob || currentJob.status === 'completed') {
      return;
    }

    if (currentJob.status === 'paused') {
      return;
    }

    const steps = [
      { progress: 10, step: '재료 인식 중...' },
      { progress: 25, step: '로봇 위치 조정 중...' },
      { progress: 40, step: '재료 절단 시작...' },
      { progress: 55, step: '재료 절단 중 (1/3)...' },
      { progress: 70, step: '재료 절단 중 (2/3)...' },
      { progress: 85, step: '재료 절단 중 (3/3)...' },
      { progress: 95, step: '작업 마무리 중...' },
      { progress: 100, step: '작업 완료!' },
    ];

    let currentStepIndex = 0;

    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        const { progress, step } = steps[currentStepIndex];
        updateJobProgress(progress, step);
        currentStepIndex++;

        if (progress === 100) {
          completeJob();
          setTimeout(() => {
            navigate('/complete');
          }, 1000);
        }
      }
    }, 2000); // 2초마다 업데이트

    return () => clearInterval(interval);
  }, [currentJob?.status, updateJobProgress, completeJob, navigate]);

  if (!currentJob) {
    navigate('/');
    return null;
  }

  const handlePauseResume = () => {
    if (isPaused) {
      resumeJob();
      setIsPaused(false);
    } else {
      pauseJob();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (confirm('작업을 정말 중지하시겠습니까?')) {
      navigate('/');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${secs.toString().padStart(2, '0')}초`;
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">작업 진행 중</h1>
          <button
            onClick={handlePauseResume}
            className="btn-secondary flex items-center gap-2"
            disabled={currentJob.status === 'completed'}
          >
            {isPaused ? (
              <>
                <Play size={20} />
                <span>재개</span>
              </>
            ) : (
              <>
                <Pause size={20} />
                <span>일시정지</span>
              </>
            )}
          </button>
        </div>

        {/* 진행률 */}
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">진행률</h2>

          {/* 프로그레스 바 */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-primary-600">
                {currentJob.progress}%
              </span>
              <span className="text-gray-600">{currentJob.currentStep}</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600 transition-all duration-500 ease-out"
                style={{ width: `${currentJob.progress}%` }}
              />
            </div>
          </div>

          {/* 시간 정보 */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-sm text-gray-600">경과 시간</p>
              <p className="text-lg font-semibold">
                {formatTime(currentJob.elapsedTime)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">예상 시간</p>
              <p className="text-lg font-semibold">
                {formatTime(currentJob.estimatedTime)}
              </p>
            </div>
          </div>
        </div>

        {/* 작업 정보 */}
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">작업 정보</h2>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{currentJob.material.image}</span>
            <div>
              <p className="font-semibold text-lg">{currentJob.material.name}</p>
              <p className="text-gray-600">{currentJob.mode.name}</p>
              {currentJob.mode.mmSize && (
                <p className="text-sm text-primary-600">{currentJob.mode.mmSize}</p>
              )}
            </div>
          </div>
        </div>

        {/* 로봇 상태 (Mock 데이터) */}
        <div className="card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-primary-600" size={24} />
            <h2 className="text-xl font-semibold">로봇 상태</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">상태</p>
              <p className="text-lg font-semibold">
                {currentJob.status === 'running' ? '작업 중' : '일시정지'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">힘 (Force)</p>
              <p className="text-lg font-semibold">{force.toFixed(1)} N</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">속도</p>
              <p className="text-lg font-semibold">{speed.toFixed(1)} mm/s</p>
            </div>
          </div>

          {/* 관절 각도 */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">관절 각도</p>
            <div className="grid grid-cols-3 gap-2">
              {jointAngles.map((angle, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded">
                  <span className="text-xs text-gray-600">J{index + 1}: </span>
                  <span className="font-mono">{angle.toFixed(1)}°</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 비상 정지 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handleStop}
            className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <StopCircle size={28} />
            비상 정지
          </button>
        </div>
      </div>
    </div>
  );
}
