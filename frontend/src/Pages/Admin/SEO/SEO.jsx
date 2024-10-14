import { useGetSEOQuery } from "../../../redux/seo/seoapi";
import Form from "./Form";

export default function SEO() {
  const { data } = useGetSEOQuery();
  const seo = data?.data;

  return (
    <section className="bg-base-100 shadow rounded p-4">
      <div className="container">
        <h3 className="text-center">SEO</h3>
      </div>

      <Form seo={seo} />
    </section>
  );
}
