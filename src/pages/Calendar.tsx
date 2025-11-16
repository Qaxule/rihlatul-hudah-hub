import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const hijriDate = "15 Jumada al-Akhirah 1446";
  const gregorianDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Generate calendar days for current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const hijriMonthName = "Jumada al-Akhirah 1446"; // Simplified - would need API for accurate conversion

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const days = [];
  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  // Add actual days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

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

          <Card className="shadow-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button variant="outline" size="icon" onClick={previousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-center">
                  <CardTitle className="text-xl">{monthName}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{hijriMonthName}</p>
                </div>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center font-semibold text-sm py-2">
                    {day}
                  </div>
                ))}
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`text-center py-3 rounded-lg ${
                      day === new Date().getDate() &&
                      month === new Date().getMonth() &&
                      year === new Date().getFullYear()
                        ? "bg-primary text-primary-foreground font-bold"
                        : day
                        ? "hover:bg-muted cursor-pointer transition-colors"
                        : ""
                    }`}
                  >
                    {day && (
                      <div>
                        <div className="text-sm">{day}</div>
                        <div className="text-xs text-muted-foreground">
                          {/* Simplified Hijri date - would need API for accurate conversion */}
                          {Math.floor((day + 10) % 30) + 1}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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
