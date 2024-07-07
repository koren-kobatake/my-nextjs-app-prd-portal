import Image from 'next/image';

/**
 * Headerコンポーネント
 * 
 * アプリケーションのヘッダー部分を表します。
 * 
 * 使用例:
 * <Header />
 */
export const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center bg-white">
      <div className="flex items-center justify-center">
        <Image src="/images/logo.png" alt="Logo" width={180} height={180} />
      </div>
    </header>

  );
};