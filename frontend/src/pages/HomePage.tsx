import { useNavigate } from 'react-router-dom';
import { useJobStore } from '../store/jobStore';
import { PlayCircle, History } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { jobHistory } = useJobStore();

  const handleStartJob = () => {
    navigate('/material');
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* 로고 및 제목 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-700 mb-2">
            두산 로봇 재료 손질 시스템
          </h1>
          <p className="text-gray-600">
            간편하게 재료를 선택하고 원하는 방식으로 손질하세요
          </p>
        </div>

        {/* 시작 버튼 */}
        <div className="flex justify-center mb-16">
          <button
            onClick={handleStartJob}
            className="btn-primary flex items-center gap-3 text-xl py-6 px-12 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            <PlayCircle size={32} />
            재료 손질 시작하기
          </button>
        </div>

        {/* 최근 작업 이력 */}
        {jobHistory.length > 0 && (
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <History className="text-primary-600" size={24} />
              <h2 className="text-xl font-semibold">최근 작업 이력</h2>
            </div>

            <div className="space-y-3">
              {jobHistory.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{job.material.image}</span>
                    <div>
                      <p className="font-medium">
                        {job.material.name} - {job.mode.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatTimeAgo(job.completedAt)}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${
                      job.status === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {job.status === 'success' ? '완료' : '실패'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
