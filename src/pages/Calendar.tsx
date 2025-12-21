import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Hijri month names
const hijriMonths = [
  "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
  "Jumada al-Awwal", "Jumada al-Akhirah", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhul Qi'dah", "Dhul Hijjah"
];

// Convert Gregorian date to Hijri date using the Umm al-Qura algorithm approximation
function gregorianToHijri(date: Date): { day: number; month: number; year: number; monthName: string } {
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1;
  const gregorianDay = date.getDate();

  // Julian Day Number calculation
  let jd: number;
  if (gregorianMonth <= 2) {
    const adjustedYear = gregorianYear - 1;
    const adjustedMonth = gregorianMonth + 12;
    jd = Math.floor(365.25 * (adjustedYear + 4716)) +
         Math.floor(30.6001 * (adjustedMonth + 1)) +
         gregorianDay - 1524.5;
  } else {
    jd = Math.floor(365.25 * (gregorianYear + 4716)) +
         Math.floor(30.6001 * (gregorianMonth + 1)) +
         gregorianDay - 1524.5;
  }

  // Gregorian calendar correction
  const a = Math.floor((gregorianYear - 1) / 100);
  const b = 2 - a + Math.floor(a / 4);
  jd = jd + b;

  // Islamic calendar epoch (July 16, 622 CE Julian / July 19, 622 CE Gregorian)
  const islamicEpoch = 1948439.5;
  
  // Days since Islamic epoch
  const daysSinceEpoch = jd - islamicEpoch;
  
  // Calculate Hijri date using the arithmetic calendar
  // Based on the 30-year cycle (11 leap years per 30 years)
  const cycle30 = Math.floor(daysSinceEpoch / 10631);
  const remainingDays = daysSinceEpoch - (cycle30 * 10631);
  
  // Years within the 30-year cycle
  const year30 = Math.floor((remainingDays - 1) / 354.36667);
  const daysInPreviousYears = Math.floor(year30 * 354.36667);
  let dayOfYear = remainingDays - daysInPreviousYears;
  
  const hijriYear = (cycle30 * 30) + year30 + 1;
  
  // Calculate month and day
  // Hijri months alternate between 30 and 29 days
  // Month lengths: 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29 (or 30 in leap year)
  let hijriMonth = 1;
  const monthDays = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
  
  // Check if it's a leap year (years 2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29 in 30-year cycle)
  const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
  const yearInCycle = ((hijriYear - 1) % 30) + 1;
  if (leapYears.includes(yearInCycle)) {
    monthDays[11] = 30;
  }
  
  for (let i = 0; i < 12; i++) {
    if (dayOfYear <= monthDays[i]) {
      hijriMonth = i + 1;
      break;
    }
    dayOfYear -= monthDays[i];
  }
  
  const hijriDay = Math.max(1, Math.round(dayOfYear));
  
  return {
    day: hijriDay,
    month: hijriMonth,
    year: hijriYear,
    monthName: hijriMonths[hijriMonth - 1]
  };
}

// Get Hijri date for any given Gregorian date
function getHijriDateForDay(gregorianDate: Date): { day: number; month: number; year: number } {
  return gregorianToHijri(gregorianDate);
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Calculate today's Hijri date dynamically
  const todayHijri = useMemo(() => gregorianToHijri(new Date()), []);
  const hijriDate = `${todayHijri.day} ${todayHijri.monthName} ${todayHijri.year}`;
  
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
  
  // Calculate Hijri month for the first day of the displayed Gregorian month
  const firstDayHijri = useMemo(() => {
    const firstOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return gregorianToHijri(firstOfMonth);
  }, [currentDate]);
  
  const lastDayHijri = useMemo(() => {
    const lastOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    return gregorianToHijri(lastOfMonth);
  }, [currentDate]);
  
  // Display Hijri month range for the current Gregorian month
  const hijriMonthName = firstDayHijri.month === lastDayHijri.month 
    ? `${firstDayHijri.monthName} ${firstDayHijri.year}`
    : `${firstDayHijri.monthName} - ${lastDayHijri.monthName} ${lastDayHijri.year}`;

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

  // Pre-calculate Hijri dates for all days in the month
  const hijriDatesForMonth = useMemo(() => {
    const dates: { [key: number]: number } = {};
    for (let day = 1; day <= daysInMonth; day++) {
      const gregorianDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const hijri = getHijriDateForDay(gregorianDate);
      dates[day] = hijri.day;
    }
    return dates;
  }, [currentDate, daysInMonth]);

  const upcomingEvents = [
    {
      name: "Laylat al-Qadr",
      hijriDate: "27 Ramadan 1446",
      gregorianDate: "March 27, 2025",
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
      gregorianDate: "June 5, 2025",
      description: "Most important day of Hajj",
    },
    {
      name: "Eid al-Adha",
      hijriDate: "10 Dhul Hijjah 1446",
      gregorianDate: "June 6, 2025",
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
                          {hijriDatesForMonth[day]}
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
      <Footer />
    </div>
  );
};

export default Calendar;
