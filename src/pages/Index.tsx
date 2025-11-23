import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: 'Кто написал «Повесть временных лет»?',
    options: ['Монах Нестор', 'Иннокентий Гизель', 'Василий Татищев', 'Николай Карамзин'],
    correct: 0,
    explanation: 'Монах Нестор создал «Повесть временных лет» в XI веке - один из древнейших памятников русской литературы.'
  },
  {
    question: 'Кто основал Российскую Академию наук?',
    options: ['Екатерина II', 'Иван Грозный', 'Петр I', 'Александр I'],
    correct: 2,
    explanation: 'Петр I основал Российскую Академию наук, положив начало превращению исторических знаний в науку.'
  },
  {
    question: 'Сколько томов написал Карамзин в своей «Истории государства Российского»?',
    options: ['5 томов', '12 томов', '29 томов', '4 тома'],
    correct: 1,
    explanation: 'Николай Михайлович Карамзин написал 12-томную «Историю государства Российского», которая стала одной из самых читаемых книг в России.'
  },
  {
    question: 'Кто автор 29-томной «Истории России с древнейших времен»?',
    options: ['В.О. Ключевский', 'С.М. Соловьев', 'В.Н. Татищев', 'Б.Д. Греков'],
    correct: 1,
    explanation: 'Сергей Михайлович Соловьев создал монументальный 29-томный труд «История России с древнейших времен».'
  },
  {
    question: 'В каком году начался современный этап развития российской исторической науки?',
    options: ['1945', '1917', '1987', '2000'],
    correct: 2,
    explanation: 'С 1987 года, в период Перестройки, начался современный этап: были открыты архивы и сняты многие запреты.'
  }
];

const Index = () => {
  const [readProgress, setReadProgress] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    setReadProgress(Math.min(progress, 100));
  };

  useState(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setQuizStarted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Progress value={readProgress} className="fixed top-0 left-0 right-0 z-50 h-1" />

      <article className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-16 text-center animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-primary leading-tight">
            Становление российской исторической науки
          </h1>
          <p className="text-xl text-muted-foreground italic">
            От древнерусских летописей до современных исследований
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Icon name="Clock" size={16} />
              15 минут чтения
            </span>
            <span className="flex items-center gap-2">
              <Icon name="BookOpen" size={16} />
              5 исторических периодов
            </span>
          </div>
        </header>

        <section className="mb-20">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed text-foreground mb-8 first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
              История изучения прошлого в России прошла сложный и интересный путь. 
              Мы можем выделить пять периодов, каждый из которых внес свой вклад в становление исторической науки.
            </p>
          </div>
        </section>

        <section className="mb-24">
          <div className="relative mb-12">
            <div className="absolute -left-8 top-0 bottom-0 w-1 bg-primary/20" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 flex items-center gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl">
                1
              </span>
              Первый этап
            </h2>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8 font-semibold">
            X – XVII века: Донаучный этап постижения прошлого
          </p>

          <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://cdn.poehali.dev/projects/34391417-98fc-416c-96bd-970e6d1298b1/files/29c951c5-715f-43a9-9b41-0e152be3c538.jpg"
              alt="Древнерусская летопись"
              className="w-full h-96 object-cover"
            />
            <p className="text-sm text-muted-foreground italic px-4 py-3 bg-accent/30">
              Древнерусская летопись — свидетельство донаучного периода изучения истории
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-foreground space-y-6">
            <p className="text-lg leading-relaxed">
              Этот период охватывает литературные памятники Древней Руси и Московского государства, 
              где исторические события переплетались с легендами и религиозными представлениями.
            </p>

            <Card className="border-l-4 border-l-primary bg-accent/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Icon name="ScrollText" size={24} className="text-primary" />
                  Ключевые произведения эпохи
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Icon name="CircleDot" size={20} className="flex-shrink-0 mt-1 text-primary" />
                    <div>
                      <strong>«Повесть временных лет»</strong> монаха Нестора (XI в.) — 
                      древнейшая летопись, где вымысел не был отделен от реальности
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="CircleDot" size={20} className="flex-shrink-0 mt-1 text-primary" />
                    <div>
                      <strong>«Хронограф»</strong> (1512 г.) — первый краткий обзор всемирной истории 
                      с большим русским отделом
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="CircleDot" size={20} className="flex-shrink-0 mt-1 text-primary" />
                    <div>
                      <strong>«Степенная книга»</strong> (XVI в.) — первый свод летописей, 
                      представлявший историю России как царство Божье на земле
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="CircleDot" size={20} className="flex-shrink-0 mt-1 text-primary" />
                    <div>
                      <strong>«Синопсис»</strong> (1674 г.) — первый учебник русской истории, 
                      написанный священником Иннокентием Гизелем
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-24">
          <div className="relative mb-12">
            <div className="absolute -left-8 top-0 bottom-0 w-1 bg-primary/20" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 flex items-center gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl">
                2
              </span>
              Второй этап
            </h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8 font-semibold">
            XVIII – начало XIX века: Начало превращения исторических знаний в науку
          </p>

          <div className="prose prose-lg max-w-none text-foreground space-y-6">
            <p className="text-lg leading-relaxed">
              Возникновение российской исторической науки связано с именем <strong>Петра I</strong>, 
              который основал Российскую Академию наук и приглашал в Россию иностранных ученых. 
              Заметный вклад внесли немецкие историки, которые первыми ввели в научный оборот русские летописи.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-12">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://cdn.poehali.dev/projects/34391417-98fc-416c-96bd-970e6d1298b1/files/0b11ab10-5cf8-440c-8e59-1fc0fb5b689b.jpg"
                    alt="Василий Татищев"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <Card className="bg-accent/30">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-2">Василий Никитич Татищев</h3>
                    <p className="text-sm text-muted-foreground mb-3">Первый русский историк</p>
                    <p className="text-sm leading-relaxed">
                      Автор четырехтомной «Истории Российской». Собрал уникальную коллекцию русских летописей. 
                      В его работах история – уже не результат божьего промысла, а результат человеческих деяний.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://cdn.poehali.dev/projects/34391417-98fc-416c-96bd-970e6d1298b1/files/5e41a5f3-35c0-499f-9cfc-67efa77168c8.jpg"
                    alt="Николай Карамзин"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <Card className="bg-accent/30">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-2">Николай Михайлович Карамзин</h3>
                    <p className="text-sm text-muted-foreground mb-3">Автор 12-томной истории</p>
                    <p className="text-sm leading-relaxed">
                      Написал «Историю государства Российского», которая стала одной из самых читаемых книг в России. 
                      Как писал А.С. Пушкин: «Древняя Россия была найдена Карамзиным, как Америка Колумбом».
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="border-l-4 border-l-primary bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                  <Icon name="Lightbulb" size={24} className="text-primary" />
                  Важный вклад
                </h3>
                <p className="text-lg leading-relaxed">
                  <strong>Михаил Васильевич Ломоносов</strong> отстаивал идеи древнего происхождения 
                  российского народа, в широком расселении славян усматривал грядущие границы России.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-24">
          <div className="relative mb-12">
            <div className="absolute -left-8 top-0 bottom-0 w-1 bg-primary/20" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 flex items-center gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl">
                3
              </span>
              Третий этап
            </h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8 font-semibold">
            Вторая треть XIX – начало XX века: Золотой век российской исторической науки
          </p>

          <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://cdn.poehali.dev/projects/34391417-98fc-416c-96bd-970e6d1298b1/files/a4cf98c3-f502-4db3-85e9-edf5fbf3e20a.jpg"
              alt="Историки XIX века"
              className="w-full h-96 object-cover"
            />
            <p className="text-sm text-muted-foreground italic px-4 py-3 bg-accent/30">
              Золотой век российской исторической науки
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-foreground space-y-6">
            <p className="text-lg leading-relaxed">
              Историки этого периода рассматривали Россию как часть Европы, 
              а русскую историю – как неразрывную часть всемирной истории.
            </p>

            <Card className="bg-gradient-to-br from-primary/10 to-accent/30 border-2 border-primary/30">
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-6 text-primary">Государственная теория</h3>
                <p className="text-lg leading-relaxed mb-4">
                  Выдающиеся историки <strong>Т.Н. Грановский</strong>, <strong>К.Д Кавелин</strong>, 
                  <strong>Б.Н. Чичерин</strong> разработали государственную теорию, 
                  в центре которой – изучение системы государственных учреждений.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-background/80 rounded-lg p-4">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Icon name="User" size={20} className="text-primary" />
                      Сергей Михайлович Соловьев
                    </h4>
                    <p className="text-sm">«История России с древнейших времен» (29 томов)</p>
                  </div>
                  <div className="bg-background/80 rounded-lg p-4">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Icon name="User" size={20} className="text-primary" />
                      Василий Осипович Ключевский
                    </h4>
                    <p className="text-sm">«Курс русской истории» (5 томов) — анализ фактов прошлого</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 italic text-xl bg-accent/20 rounded-r-lg">
              Пиком развития русской исторической школы XIX века стали исследования В.О. Ключевского, 
              который первым стал не просто описывать факты прошлого, но и анализировать их.
            </blockquote>
          </div>
        </section>

        <section className="mb-24">
          <div className="relative mb-12">
            <div className="absolute -left-8 top-0 bottom-0 w-1 bg-primary/20" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 flex items-center gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl">
                4
              </span>
              Четвертый этап
            </h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8 font-semibold">
            1917–1987 годы: Советская историческая наука
          </p>

          <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://cdn.poehali.dev/projects/34391417-98fc-416c-96bd-970e6d1298b1/files/7f67dc6d-a4d1-476d-af0d-77cf425b65a9.jpg"
              alt="Советские исторические книги"
              className="w-full h-96 object-cover"
            />
            <p className="text-sm text-muted-foreground italic px-4 py-3 bg-accent/30">
              Советский период исторической науки
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-foreground space-y-6">
            <p className="text-lg leading-relaxed">
              Развитие советской исторической науки основывалось на марксистской идеологии, 
              утверждавшей, что человеческое общество движется последовательно от первобытнообщинного строя к коммунизму.
            </p>

            <div className="space-y-6">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">1920-е годы</h3>
                  <p>Ведущие позиции занимала школа М.Н. Покровского, который опубликовал труд 
                  «Русская история в самом сжатом очерке», где вся дореволюционная история России 
                  изображалась исключительно в черном цвете.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">1930-е годы</h3>
                  <p>Определяющее значение для исторической науки приобрела политика. 
                  История как наука фактически была уничтожена, ее подменила марксистская идеология. 
                  Был сформирован официальный взгляд на историю.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">1950-е годы</h3>
                  <p>Происходит «оттепель» — относительная либерализация исторической науки, 
                  начинают проводиться первые научные дискуссии.</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-accent/30">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Icon name="Users" size={24} className="text-primary" />
                  Выдающиеся советские историки
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>История Киевской Руси:</strong><br />
                    Б.Д. Греков, Б.А. Рыбаков
                  </div>
                  <div>
                    <strong>История Московского государства:</strong><br />
                    А.А. Зимин, В.Б. Кобрин, Р.Г. Скрынников
                  </div>
                  <div>
                    <strong>История Российской империи:</strong><br />
                    Е.В. Тарле, М.В. Нечкина, А.Я. Аврех, Н.И. Павленко
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-24">
          <div className="relative mb-12">
            <div className="absolute -left-8 top-0 bottom-0 w-1 bg-primary/20" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 flex items-center gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl">
                5
              </span>
              Пятый этап
            </h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8 font-semibold">
            С 1987 года по настоящее время: Современный период
          </p>

          <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://cdn.poehali.dev/projects/34391417-98fc-416c-96bd-970e6d1298b1/files/1003b5f4-87e9-4e9a-bf26-1c86123a839a.jpg"
              alt="Современные исторические исследования"
              className="w-full h-96 object-cover"
            />
            <p className="text-sm text-muted-foreground italic px-4 py-3 bg-accent/30">
              Современный этап российской исторической науки
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-foreground space-y-6">
            <p className="text-lg leading-relaxed">
              В годы Перестройки произошел <strong>«исторический бум»</strong>: 
              были открыты архивы, сняты запреты на исследование многих тем. 
              Оценки ряда деятелей и исторических событий изменились на противоположные.
            </p>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/20 border-2 border-primary/20">
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
                  <Icon name="TrendingUp" size={28} className="text-primary" />
                  Новые направления исследований
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex gap-3">
                    <Icon name="Check" size={24} className="flex-shrink-0 text-primary" />
                    <span>Возрос интерес к истории церкви и биографиям отдельных личностей</span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" size={24} className="flex-shrink-0 text-primary" />
                    <span>Появились работы по истории самодержавия, реформ, парламентаризма</span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" size={24} className="flex-shrink-0 text-primary" />
                    <span>Переосмысление революционных событий 1917 года</span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" size={24} className="flex-shrink-0 text-primary" />
                    <span>Изучение «белого движения», раскулачивания, массовых репрессий</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-20">
          <Card className="border-2 border-primary shadow-2xl bg-gradient-to-br from-primary/10 to-accent/10">
            <CardContent className="p-10">
              <div className="text-center mb-8">
                <Icon name="CheckCircle2" size={56} className="mx-auto mb-4 text-primary" />
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Выводы</h2>
                <p className="text-lg text-muted-foreground">
                  Подводя итоги развития российской исторической науки
                </p>
              </div>
              
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="flex items-start gap-6 p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">1</span>
                  </div>
                  <p className="text-lg leading-relaxed pt-2">
                    Российская историческая наука существует <strong>более трех веков</strong>
                  </p>
                </div>
                <div className="flex items-start gap-6 p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">2</span>
                  </div>
                  <p className="text-lg leading-relaxed pt-2">
                    Для нее характерно <strong>богатство различных школ и направлений</strong>
                  </p>
                </div>
                <div className="flex items-start gap-6 p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">3</span>
                  </div>
                  <p className="text-lg leading-relaxed pt-2">
                    Она внесла <strong>значительный вклад</strong> в развитие знаний как об истории России, 
                    так и о мировой истории в целом
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <Card className="border-2 border-primary/50 bg-gradient-to-br from-accent/20 to-primary/5">
            <CardContent className="p-10">
              <div className="text-center mb-8">
                <Icon name="Brain" size={56} className="mx-auto mb-4 text-primary" />
                <h2 className="text-4xl font-bold text-primary mb-4">Проверьте свои знания</h2>
                <p className="text-lg text-muted-foreground">
                  Пройдите интерактивный тест и узнайте, насколько хорошо вы усвоили материал
                </p>
              </div>

              {!quizStarted && !quizCompleted && (
                <div className="text-center">
                  <Button 
                    size="lg" 
                    onClick={() => setQuizStarted(true)}
                    className="text-lg px-8 py-6"
                  >
                    <Icon name="Play" size={24} className="mr-2" />
                    Начать тест
                  </Button>
                </div>
              )}

              {quizStarted && !quizCompleted && (
                <div className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Вопрос {currentQuestion + 1} из {quizQuestions.length}</span>
                      <span>Правильных ответов: {score}</span>
                    </div>
                    <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} />
                  </div>

                  <h3 className="text-2xl font-bold mb-6 text-primary">
                    {quizQuestions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3 mb-6">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={
                          showExplanation
                            ? index === quizQuestions[currentQuestion].correct
                              ? "default"
                              : selectedAnswer === index
                              ? "destructive"
                              : "outline"
                            : "outline"
                        }
                        className="w-full text-left justify-start h-auto py-4 px-6"
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showExplanation}
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-base">{option}</span>
                          {showExplanation && index === quizQuestions[currentQuestion].correct && (
                            <Icon name="CheckCircle" size={20} className="ml-auto" />
                          )}
                          {showExplanation && selectedAnswer === index && index !== quizQuestions[currentQuestion].correct && (
                            <Icon name="XCircle" size={20} className="ml-auto" />
                          )}
                        </span>
                      </Button>
                    ))}
                  </div>

                  {showExplanation && (
                    <Card className="bg-primary/5 border-primary/30 mb-6">
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                          <Icon name="Info" size={20} className="text-primary" />
                          Пояснение
                        </h4>
                        <p className="text-foreground">{quizQuestions[currentQuestion].explanation}</p>
                      </CardContent>
                    </Card>
                  )}

                  {showExplanation && (
                    <Button 
                      size="lg" 
                      onClick={handleNextQuestion}
                      className="w-full"
                    >
                      {currentQuestion < quizQuestions.length - 1 ? 'Следующий вопрос' : 'Завершить тест'}
                      <Icon name="ArrowRight" size={20} className="ml-2" />
                    </Button>
                  )}
                </div>
              )}

              {quizCompleted && (
                <div className="text-center max-w-2xl mx-auto">
                  <div className="mb-8">
                    <div className="text-6xl font-bold text-primary mb-4">
                      {score} / {quizQuestions.length}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {score === quizQuestions.length
                        ? '🎉 Превосходно!'
                        : score >= quizQuestions.length * 0.6
                        ? '👍 Хороший результат!'
                        : '📚 Есть над чем поработать'}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {score === quizQuestions.length
                        ? 'Вы отлично знаете историю российской исторической науки!'
                        : score >= quizQuestions.length * 0.6
                        ? 'Вы неплохо усвоили материал, но есть пробелы в знаниях.'
                        : 'Рекомендуем перечитать материал и попробовать снова.'}
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    onClick={restartQuiz}
                    className="text-lg px-8 py-6"
                  >
                    <Icon name="RotateCcw" size={24} className="mr-2" />
                    Пройти тест заново
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <footer className="text-center py-8 border-t border-border">
          <p className="text-sm text-muted-foreground italic">
            Образовательный лонгрид о становлении российской исторической науки
          </p>
        </footer>
      </article>
    </div>
  );
};

export default Index;
