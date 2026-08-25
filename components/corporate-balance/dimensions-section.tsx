import { dimensions } from "./content"

export function DimensionsSection() {
  return (
    <section id="method" className="border-b border-[#173B2F]/10">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">
            The Framework
          </p>
          <h2 className="mt-6 text-pretty text-4xl leading-tight text-[#173B2F] md:text-5xl">
            Eight dimensions of a salutogenic workplace.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-[#173B2F]/70">
            The assessment looks beyond perks and programs to the daily conditions
            that influence how people experience work.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] bg-[#173B2F]/10 sm:grid-cols-2 lg:grid-cols-4">
          {dimensions.map(({ title, description }) => (
            <article key={title} className="bg-[#EFE7DA] px-8 py-10">
              <span
                aria-hidden="true"
                className="block h-px w-8 bg-[#A47D47]"
              />
              <h3 className="mt-6 text-2xl text-[#173B2F]">{title}</h3>
              <p className="mt-4 text-pretty leading-relaxed text-[#173B2F]/65">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
