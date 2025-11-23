import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Period {
  id: number;
  title: string;
  years: string;
  description: string;
  highlights: string[];
  historians?: { name: string; work: string }[];
  image?: string;
}

const periods: Period[] = [
  {
    id: 1,
    title: 'Первый этап',
    years: 'X - XVII вв.',
    description: 'Донаучный этап постижения прошлого. Литературные памятники Древней Руси и Московского государства.',
    image: 'https://cdn.poehali.dev/projects/34391417-98fc-416c-96bd-970e6d1298b1/files/416a89d2-c62f-4a63-95cc-73ec1707ee30.jpg',
    highlights: [
      '«Повесть временных лет» монаха Нестора (XI в.) - вымысел не был отделен от реальности',
      '«Хронограф» (1512 г.) - первый краткий обзор всемирной истории',
      '«Степенная книга» (XVI в.) - первый свод летописей, история России как царство Божье',
      '«Синопсис» (1674 г.) - первый учебник русской истории священника Иннокентия Гизеля'
    ]
  },
  {
    id: 2,
    title: 'Второй этап',
    years: 'XVIII - начало XIX вв.',
    description: 'Начало превращения исторических знаний в науку. Основание Российской Академии наук Петром I.',
    image: 'https://cdn.poehali.dev/projects/34391417-98fc-416c-96bd-970e6d1298b1/files/e751d759-9528-4c59-9d20-4fba737bd0e2.jpg',
    highlights: [
      'Немецкая школа: Г. Байер, А. Шлёцер - ввели в оборот русские летописи',
      'Г.Ф. Миллер собрал богатейшие архивные материалы по истории Сибири'
    ],
    historians: [
      { name: 'Василий Никитич Татищев', work: '«История Российская» (4 тома)' },
      { name: 'Михаил Васильевич Ломоносов', work: 'Идеи древнего происхождения российского народа' },
      { name: 'Николай Михайлович Карамзин', work: '«История государства Российского» (12 томов)' }
    ]
  },
  {
    id: 3,
    title: 'Третий этап',
    years: 'вторая треть XIX - начало XX вв.',
    description: 'Становление и развитие отечественной исторической науки. Россия рассматривается как часть Европы.',
    image: 'https://cdn.poehali.dev/projects/34391417-98fc-416c-96bd-970e6d1298b1/files/f2b4acd2-6f3a-4909-9486-794c1b6dcceb.jpg',
    highlights: [
      'Государственная теория: изучение системы государственных учреждений',
      'Выдающиеся историки: Т.Н. Грановский, К.Д Кавелин, Б.Н. Чичерин'
    ],
    historians: [
      { name: 'Сергей Михайлович Соловьев', work: '«История России с древнейших времен» (29 томов)' },
      { name: 'Василий Осипович Ключевский', work: '«Курс русской истории» (5 томов) - анализ фактов прошлого' }
    ]
  },
  {
    id: 4,
    title: 'Четвертый этап',
    years: '1917-1987 гг.',
    description: 'Развитие советской исторической науки на основе марксистской идеологии. Политическое влияние на исследования.',
    highlights: [
      '1920-е: школа М.Н. Покровского - «Русская история в самом сжатом очерке»',
      '1930-е: политика определяет науку, формируется официальный взгляд на историю',
      '1950-е: «оттепель» - относительная либерализация, первые научные дискуссии'
    ],
    historians: [
      { name: 'Б.Д. Греков, Б.А. Рыбаков', work: 'История Киевской Руси' },
      { name: 'А.А. Зимин, В.Б. Кобрин, Р.Г. Скрынников', work: 'История Московского государства' },
      { name: 'Е.В. Тарле, М.В. Нечкина, А.Я. Аврех, Н.И. Павленко', work: 'История Российской империи' }
    ]
  },
  {
    id: 5,
    title: 'Пятый этап',
    years: 'с 1987 года по настоящее время',
    description: 'Современный период развития российской исторической науки. «Исторический бум» в годы Перестройки.',
    highlights: [
      'Открытие архивов, снятие запретов на исследование многих тем',
      'Переосмысление революционных событий 1917 г.',
      'Изучение «белого движения», раскулачивания, массовых репрессий',
      'Возрос интерес к истории церкви, биографиям отдельных личностей',
      'Работы по истории самодержавия, реформ, парламентаризма и политических партий'
    ]
  }
];

const conclusions = [
  'Российская историческая наука существует более трех веков',
  'Для нее характерно богатство различных школ и направлений',
  'Она внесла значительный вклад в развитие и углубление знаний как об истории России, так и о мировой истории в целом'
];

const Index = () => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.period-section');
      let current = 0;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          current = index;
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const section = document.getElementById(`period-${index}`);
    section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              Становление российской исторической науки
            </h1>
            <div className="hidden md:flex gap-2">
              {periods.map((period, index) => (
                <Button
                  key={period.id}
                  variant={activeSection === index ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => scrollToSection(index)}
                  className="text-xs"
                >
                  {period.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
              Пять периодов развития
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              История изучения прошлого в России прошла сложный и интересный путь. 
              Каждый период внес свой уникальный вклад в становление исторической науки.
            </p>
          </div>
        </section>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-border h-full hidden lg:block" />
          
          {periods.map((period, index) => (
            <section
              key={period.id}
              id={`period-${index}`}
              className="period-section container mx-auto px-4 mb-16"
            >
              <div className={`max-w-6xl mx-auto ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                <Card className={`animate-fade-in border-2 hover:shadow-xl transition-shadow duration-300 ${
                  index % 2 === 0 ? 'lg:ml-0 lg:mr-auto' : 'lg:ml-auto lg:mr-0'
                } lg:w-[calc(50%-2rem)]`}>
                  <CardContent className="p-8">
                    {period.image && (
                      <div className="mb-6 -mt-8 -mx-8 overflow-hidden rounded-t-lg">
                        <img 
                          src={period.image} 
                          alt={period.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary-foreground">{period.id}</span>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-primary mb-2">{period.title}</h3>
                        <p className="text-lg text-muted-foreground font-semibold">{period.years}</p>
                      </div>
                    </div>
                    
                    <p className="text-lg mb-6 leading-relaxed text-foreground">{period.description}</p>
                    
                    <div className="space-y-4 mb-6">
                      <h4 className="font-semibold text-lg text-primary flex items-center gap-2">
                        <Icon name="BookOpen" size={20} />
                        Ключевые события:
                      </h4>
                      <ul className="space-y-3">
                        {period.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-foreground">
                            <Icon name="CircleDot" size={16} className="mt-1 flex-shrink-0 text-primary" />
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {period.historians && period.historians.length > 0 && (
                      <div className="space-y-4 pt-6 border-t border-border">
                        <h4 className="font-semibold text-lg text-primary flex items-center gap-2">
                          <Icon name="Users" size={20} />
                          Выдающиеся историки:
                        </h4>
                        <div className="grid gap-4">
                          {period.historians.map((historian, idx) => (
                            <div key={idx} className="bg-accent/30 rounded-lg p-4 hover:bg-accent/50 transition-colors">
                              <p className="font-semibold text-primary mb-1">{historian.name}</p>
                              <p className="text-sm text-muted-foreground">{historian.work}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </section>
          ))}
        </div>

        <section className="container mx-auto px-4 mt-24">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary shadow-2xl animate-fade-in">
              <CardContent className="p-10">
                <div className="text-center mb-8">
                  <Icon name="CheckCircle2" size={48} className="mx-auto mb-4 text-primary" />
                  <h3 className="text-4xl font-bold text-primary mb-4">Выводы</h3>
                  <p className="text-lg text-muted-foreground">
                    Подводя итоги развития российской исторической науки
                  </p>
                </div>
                
                <div className="space-y-6">
                  {conclusions.map((conclusion, index) => (
                    <div key={index} className="flex items-start gap-4 p-6 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xl font-bold text-primary-foreground">{index + 1}</span>
                      </div>
                      <p className="text-lg leading-relaxed text-foreground pt-1">{conclusion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 mt-16 text-center">
          <p className="text-sm text-muted-foreground italic">
            Образовательный проект о становлении российской исторической науки
          </p>
        </section>
      </main>
    </div>
  );
};

export default Index;