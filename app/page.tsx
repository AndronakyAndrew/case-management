import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">CaseManagement</div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Войти</Button>
            </Link>
            <Link href="/register">
              <Button>Регистрация</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Управляйте делами <span className="text-primary">эффективно</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg md:text-xl text-muted-foreground">
              Профессиональная система управления делами для бизнеса в Приднестровье. Оптимизируйте рабочие процессы и
              повышайте продуктивность.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Начать бесплатно <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline">
                  Демонстрация
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Наши преимущества</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Удобный интерфейс</h3>
                <p className="text-muted-foreground">Интуитивно понятная система, не требующая специального обучения</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Безопасность данных</h3>
                <p className="text-muted-foreground">
                  Надежная защита информации и соответствие требованиям законодательства
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Аналитика</h3>
                <p className="text-muted-foreground">Подробные отчеты и статистика для принятия обоснованных решений</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-sm text-muted-foreground">© 2025 Genesis Industries. Все права защищены.</div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:underline">
              Условия использования
            </Link>
            <Link href="/privacy" className="hover:underline">
              Политика конфиденциальности
            </Link>
            <Link href="/contact" className="hover:underline">
              Контакты
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

