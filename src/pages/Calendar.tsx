import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Star } from "lucide-react";

const Calendar = () => {
  const hijriDate = "15 Jumada al-Akhirah 1446";
  const gregorianDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const upcomingEvents = [
    {
      name: "Laylat al-Qadr",
      hijriDate: "27 Ramadan 1446",
      gregorianDate: "March 18, 2025",
      description: "The Night of Power",
    },
    {
      name: "Eid al-Fitr",
      hijriDate: "1 Shawwal 1446",
      gregorianDate: "March 30, 2025",
      description: "Festival of Breaking the Fast",
    },
    {
      name: "Day of Arafah",
      hijriDate: "9 Dhul Hijjah 1446",
      gregorianDate: "June 6, 2026",
      description: "Most important day of Hajj",
    },
    {
      name: "Eid al-Adha",
      hijriDate: "10 Dhul Hijjah 1446",
      gregorianDate: "June 7, 2026",
      description: "Festival of Sacrifice",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Islamic Calendar</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Important dates and upcoming Islamic events
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="shadow-elevated text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Today's Date</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-primary mb-2">{hijriDate}</p>
                <p className="text-sm text-muted-foreground">Hijri Calendar</p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-xl">{gregorianDate}</p>
                <p className="text-sm text-muted-foreground">Gregorian Calendar</p>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.name} className="shadow-soft">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-accent" />
                      <CardTitle>{event.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <CalendarIcon className="h-4 w-4 inline mr-1" />
                        {event.hijriDate}
                      </div>
                      <div className="text-muted-foreground">
                        {event.gregorianDate}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
