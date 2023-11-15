function page() {
  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4x1">
          <h2 className="text-base font-semibold leading-7">Pricing </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight">
            The right price for you,{" "}
            <br className="hidden sm:inline lg:hidden" />
            whoever you are{" "}
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg leading-8">
            Were 99% sure we have a plan to match 100% of your needs{" "}
          </p>
          <svg
            viewBox="8 0 1208 1024"
            className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white, transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-8 blur-3xl"
          >
            <ellipse
              cx={684}
              cy={512}
              fill="url(#radial-gradient-pricing)"
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id="radial-gradient-pricing">
                <stop stopColor={"hsl(var(--muted))"} />
                <stop offset={1} stopColor={"hsl(var(--primary))"} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default page;
