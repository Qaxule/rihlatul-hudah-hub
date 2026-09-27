import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { PageWrapper } from "@/components/app/PageWrapper";
import { useSEO } from "@/hooks/useSEO";
import { clarifiedArticles, clarifiedCategories } from "@/data/clarifiedContent";
import NotFound from "./NotFound";

const ClarifiedDetail = () => {
  const { articleId } = useParams();
  const article = clarifiedArticles.find((a) => a.id === articleId);

  useSEO({
    title: article ? `Myth: ${article.myth}` : "Islam Clarified",
    description: article ? article.reality.slice(0, 155) : "Misconceptions about Islam clarified.",
    path: `/clarified/${articleId ?? ""}`,
  });

  if (!article) return <NotFound />;
  const category = clarifiedCategories.find((c) => c.id === article.category);
  const related = clarifiedArticles.filter((a) => a.category === article.category && a.id !== article.id);

  return (
    <PageWrapper>
      <article className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/clarified" className="inline-flex items-center text-sm text-muted-foreground mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Islam Clarified
        </Link>
        <p className="text-sm text-primary mb-2">{category?.name}</p>

        <section className="border-l-2 border-destructive/60 pl-4 mb-6">
          <p className="text-xs uppercase tracking-wide text-destructive/80">Myth</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{article.myth}</h1>
        </section>

        <section className="border-l-2 border-primary pl-4 mb-8">
          <p className="text-xs uppercase tracking-wide text-primary">Reality</p>
          <p className="text-lg text-foreground font-medium">{article.reality}</p>
        </section>

        <div className="space-y-4 text-foreground/90 leading-relaxed mb-10">
          {article.body.map((p, i) => <p key={i}>{p}</p>)}
          <p className="text-muted-foreground italic">{article.summary}</p>
        </div>

        <h2 className="text-lg font-semibold text-foreground mb-3">Sources</h2>
        <ul className="divide-y divide-border border-y border-border mb-10">
          {article.sources.map((s, i) => (
            <li key={i} className="py-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide text-accent-foreground/70">
                  {s.type === "quran" ? "Qur'an" : "Hadith"}
                </span>
                {s.link ? (
                  <Link to={s.link} className="text-sm font-medium text-primary">{s.reference}</Link>
                ) : (
                  <span className="text-sm font-medium text-foreground">{s.reference}</span>
                )}
              </div>
              {s.arabic && <p dir="rtl" className="font-arabic text-xl text-right text-foreground">{s.arabic}</p>}
              <p className="text-muted-foreground">"{s.text}"</p>
            </li>
          ))}
        </ul>

        {related.length > 0 && (
          <>
            <h2 className="text-lg font-semibold text-foreground mb-3">Related</h2>
            <ul className="divide-y divide-border border-y border-border">
              {related.map((r) => (
                <li key={r.id}>
                  <Link to={`/clarified/${r.id}`} className="block py-3 text-foreground">{r.myth}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </article>
    </PageWrapper>
  );
};

export default ClarifiedDetail;
