import { useGetProjectDetail } from '@/hooks/api/useProject';
import { useUserStore } from '@/store/user';
import { useNavigate, useParams } from 'react-router-dom';

type ProjectDetailSectionProps = { type: string };

const ProjectDetailSection = ({ type }: ProjectDetailSectionProps) => {
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const projectName = queryParams.get('name'); // 쿼리 파라미터 'name' 값을 받음

  const { id } = useParams();
  const { name } = useUserStore();

  const { data } = useGetProjectDetail(type == 'like', Number(id));

  return (
    <div className="h-full w-full bg-white p-6 flex flex-col gap64 rounded-t-3xl">
      <div className="flex items-center gap-2">
        <div className="bg-[#7D7D7D] rounded-md px-2 py-1 w-fit text-primary text-xs">
          {projectName}
        </div>
        <div className="text-secondary font-bold py-4">
          팀원들이 보는 {name}님
        </div>
      </div>
      <div className="py-4 flex flex-col gap-4">
        <div className="flex flex-col px-5 py-4 gap-6 bg-white200 rounded-3xl">
          <div className="w-full border-b border-white300 pb-2 text-[#646464] text-xs font-bold">
            AI가 요약한 {name}님이에요!
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-secondary text-lg font-bold">
              {data?.data?.reports?.title}
            </div>
            <div className="text-[#646464] text-xs font-normal">
              {data?.data?.reports?.content}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className={`${closed && 'h-[220px] overflow-hidden'} flex flex-col px-5 py-4 gap-2 bg-white200 rounded-3xl`}
        >
          <div className="w-full border-b border-white300 pb-2 text-[#646464] text-xs font-bold">
            팀원들의 자세한 평가
          </div>
          <div className="p-2 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              {data?.data?.evaluations.map((evaluation) => (
                <div
                  onClick={() => navigate(`/feedback/:${evaluation.id}`)}
                  key={evaluation.id}
                  className="bg-white w-full rounded-xl p-3 text-[#191919] text-xs font-bold"
                >
                  {evaluation.nickname}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailSection;
