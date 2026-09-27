import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PageWrapper } from "@/components/app/PageWrapper";
import { useSEO } from "@/hooks/useSEO";
import { clarifiedArticles, clarifiedCategories } from "@/data/clarifiedContent";

const Clarified = () => {
  useSEO({
    title: "Islam Clarified: Common Misconceptions About Islam",
    description: "Myths versus reality about Islam, answered with Qur'an and Hadith sources. Beliefs, women in Islam, jihad, Sharia and more.",
    path: "/clarified",
  });
  const [active, setActive] = useState<string>("all");
  const cats = active === "all" ? clarifiedCategories : clarifiedCategories.filter((c) => c.id === active);

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <header className="text-center mb-8 space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Islam Clarified</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Common misconceptions about Islam, answered from the Qur'an and authentic Hadith.
          </p>
        </header>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 border-b border-border [scrollbar-width:none]">
          {[{ id: "all", name: "All" }, ...clarifiedCategories].map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`shrink-0 px-3 py-1.5 text-sm rounded-full border ${
                active === c.id ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {cats.map((cat) => (
          <section key={cat.id} className="mb-10">
            <h2 className="text-xl font-semibold text-foreground">{cat.name}</h2>
            <p className="text-sm text-muted-foreground mb-3">{cat.description}</p>
            <ul className="divide-y divide-border border-y border-border">
              {clarifiedArticles.filter((a) => a.category === cat.id).map((a) => (
                <li key={a.id}>
                  <Link to={`/clarified/${a.id}`} className="flex items-center gap-3 py-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-wide text-destructive/80 mb-0.5">Myth</p>
                      <p className="font-medium text-foreground">{a.myth}</p>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{a.reality}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageWrapper>
  );
};

export default Clarified;
