export default function Loading() {
    const letters = ['L', 'o', 'a', 'd', 'i', 'n', 'g', '.', '.', '.']
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex justify-center items-center">
            {letters.map((letter, index) => (
              <span
                key={index}
                className="inline-block animate-bounce ml-2"
                style={{
                  animationDuration: '1s',
                  animationDelay: `${index * 0.1}s`,
                  animationIterationCount: 'infinite',
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>
      </div>
    )
  }