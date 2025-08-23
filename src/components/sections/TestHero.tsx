'use client';

const TestHero = () => {
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">테스트 헤로</h1>
        <p className="text-xl text-white/70">콘텐츠가 제대로 보이는지 테스트</p>
        <div className="mt-8">
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
            버튼 테스트
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestHero;