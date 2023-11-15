export default function Home() {
  return (
    <div>
      <div
        className="absolute inset-0 top-28 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 translate-y-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 "
          style={{
            clipPath:
              "polygon(74.1% 44,1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="py-12 sm:py-20 lg: pb-40">
        <div className="mx-auto max-w-7xl px-6 1g:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6x1">
              A Website Template
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A snazzy subtitle for the website.{" "}
              <span className="text-primary">Let the template handle it</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
