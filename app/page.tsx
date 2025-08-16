import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Cpu, Shield, Save, TrendingUp, CheckCircle, Users, Award } from "lucide-react"
import {redirect} from "next/navigation";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Cpu className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold text-foreground">PC Part Picker</span>
                        </div>
                        <nav className="hidden md:flex items-center space-x-8">
                            <a
                                href="#funkcje"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Funkcje
                            </a>
                            <a
                                href="#zrzuty"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Podgląd
                            </a>
                            <a
                                href="#opinie"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Opinie
                            </a>
                        </nav>
                        <Button className="font-semibold"><Link href='/konfiguracja/nowa'>Rozpocznij konfigurację</Link> </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge variant="secondary" className="mb-6 text-sm font-medium">
                            Nowa wersja dostępna
                        </Badge>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            Zbuduj idealny komputer z <span className="text-primary">kompatybilnymi</span> podzespołami
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                            Nasza aplikacja pomoże Ci dobrać wszystkie komponenty komputera, sprawdzić ich kompatybilność i znaleźć
                            najlepsze ceny. Zbuduj swój wymarzony PC bez stresu.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" className="text-lg px-8 py-3 font-semibold">
                                Rozpocznij konfigurację
                            </Button>
                            <Button variant="outline" size="lg" className="text-lg px-8 py-3 font-medium bg-transparent">
                                Zobacz demo
                            </Button>
                        </div>
                        <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span>Darmowe użytkowanie</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-primary" />
                                <span>50,000+ użytkowników</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Award className="h-4 w-4 text-primary" />
                                <span>Zaufane przez ekspertów</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="funkcje" className="py-20 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            Wszystko czego potrzebujesz do budowy PC
                        </h2>
                        <p className="text-lg text-muted-foreground">Nasze narzędzia pomogą Ci w każdym kroku budowy komputera</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="border-border hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="text-center pb-4">
                                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <Shield className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg font-semibold">Sprawdzanie kompatybilności</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-center text-muted-foreground">
                                    Automatyczne wykrywanie konfliktów między podzespołami i sugestie zamienników
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="border-border hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="text-center pb-4">
                                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <Cpu className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg font-semibold">Inteligentne filtrowanie</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-center text-muted-foreground">
                                    Zaawansowane filtry pomagają znaleźć idealne komponenty w Twoim budżecie
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="border-border hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="text-center pb-4">
                                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <Save className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg font-semibold">Zapisywanie konfiguracji</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-center text-muted-foreground">
                                    Zapisuj swoje zestawy, porównuj różne warianty i udostępniaj znajomym
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="border-border hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="text-center pb-4">
                                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg font-semibold">Porównanie cen</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-center text-muted-foreground">
                                    Aktualne ceny z wielu sklepów internetowych w jednym miejscu
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Screenshots Section */}
            <section id="zrzuty" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Intuicyjny interfejs</h2>
                        <p className="text-lg text-muted-foreground">
                            Przejrzyste narzędzia do budowy komputera dostępne w przeglądarce
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="relative">
                            <div className="bg-card border border-border rounded-lg p-8 shadow-xl">
                                <img
                                    src="/pc-part-picker-interface.png"
                                    alt="Interfejs aplikacji PC Part Picker"
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                                Sprawdź kompatybilność w czasie rzeczywistym
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="opinie" className="py-20 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Co mówią nasi użytkownicy</h2>
                        <p className="text-lg text-muted-foreground">
                            Tysiące zadowolonych użytkowników zbudowało swoje wymarzone komputery
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Card className="border-border">
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-6">
                                    "Dzięki PC Part Picker zbudowałem swój pierwszy komputer bez żadnych problemów. Sprawdzanie
                                    kompatybilności oszczędziło mi dużo czasu i pieniędzy."
                                </p>
                                <div className="flex items-center space-x-3">
                                    <Avatar>
                                        <AvatarImage src="/polish-male-avatar.png" />
                                        <AvatarFallback>MK</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-foreground">Michał Kowalski</p>
                                        <p className="text-sm text-muted-foreground">Entuzjasta gamingu</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border">
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-6">
                                    "Jako właściciel sklepu komputerowego polecam tę aplikację wszystkim klientom. Znacznie ułatwia dobór
                                    podzespołów i redukuje reklamacje."
                                </p>
                                <div className="flex items-center space-x-3">
                                    <Avatar>
                                        <AvatarImage src="/polish-businesswoman-avatar.png" />
                                        <AvatarFallback>AN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-foreground">Anna Nowak</p>
                                        <p className="text-sm text-muted-foreground">Właściciel sklepu IT</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border">
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-6">
                                    "Świetne narzędzie do planowania upgrade'u komputera. Porównanie cen z różnych sklepów pozwoliło mi
                                    zaoszczędzić ponad 500 złotych!"
                                </p>
                                <div className="flex items-center space-x-3">
                                    <Avatar>
                                        <AvatarImage src="/polish-tech-avatar.png" />
                                        <AvatarFallback>PW</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-foreground">Piotr Wiśniewski</p>
                                        <p className="text-sm text-muted-foreground">Student informatyki</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Gotowy na budowę swojego wymarzonego PC?</h2>
                        <p className="text-xl mb-8 text-primary-foreground/90">
                            Dołącz do tysięcy zadowolonych użytkowników i zbuduj komputer idealny dla Twoich potrzeb
                        </p>
                        <Button size="lg" variant="secondary" className="text-lg px-8 py-3 font-semibold">
                            Zacznij teraz
                        </Button>
                        <p className="mt-4 text-sm text-primary-foreground/80">
                            Darmowe konto • Bez zobowiązań • Pełna funkcjonalność
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-muted/30 border-t border-border py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Cpu className="h-6 w-6 text-primary" />
                                <span className="text-lg font-bold text-foreground">PC Part Picker</span>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                Najlepsze narzędzie do dobierania kompatybilnych podzespołów komputerowych w Polsce.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-4">Produkt</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <a href="#" className="hover:text-foreground transition-colors">
                                        Funkcje
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-foreground transition-colors">
                                        Cennik
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-foreground transition-colors">
                                        API
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-4">Wsparcie</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <a href="#" className="hover:text-foreground transition-colors">
                                        Pomoc
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-foreground transition-colors">
                                        Kontakt
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-foreground transition-colors">
                                        Status
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-4">Firma</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <a href="#" className="hover:text-foreground transition-colors">
                                        O nas
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-foreground transition-colors">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-foreground transition-colors">
                                        Kariera
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
                        <p>&copy; 2024 PC Part Picker. Wszystkie prawa zastrzeżone.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

