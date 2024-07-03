import { CardDemo } from "@/components/CardDemo";

import { cardData } from "./constants/data";

export default function Card() {
    return (
      <div className='container mx-auto'>
        <h1 className='text-3xl font-bold'>かーど</h1>
        <section className="container flex pt-16 grid grid-cols-2 gap-10 xl:grid-cols-3">
              {cardData.map((data, index) => (
                  <CardDemo
                      key={index}  // ここでkeyプロパティを追加します
                      cardTitle={data.title}
                      cardDescription={data.description}
                      cardContent={data.content}
                      cardFooter={data.footer}
                  />
              ))}
        </section>
      </div>
    );
}
