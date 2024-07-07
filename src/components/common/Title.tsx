/**
 * Titleコンポーネント
 * 
 * アプリケーションのタイトル部分を表します。
 * 
 * 使用例:
 * <Title title="ページのタイトル" />
 */
export const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center items-center bg-[#e5e5e5] py-4 border-b border-[#d4d5d5]">
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
};
