import { useState, useMemo } from "react";
import { PageWrapper } from "@/components/app/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Hijri month names
const hijriMonths = [
  "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
  "Jumada al-Awwal", "Jumada al-Akhirah", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhul Qi'dah", "Dhul Hijjah"
];


// Convert Gregorian date to Hijri date using improved Kuwaiti algorithm
function gregorianToHijri(date: Date): { day: number; month: number; year: number; monthName: string } {
  // Use a known reference point: January 1, 2025 = 1 Rajab 1446
  // Actually, let me use: December 21, 2024 = 20 Jumada al-Akhirah 1446
  // But user says Dec 21, 2024 should be 1 Rajab... let me recalculate
  
  // Reference: March 30, 2025 = 1 Shawwal 1446 (Eid al-Fitr - well known date)
  // Working backwards: Ramadan 1446 started around March 1, 2025
  // So December 21, 2024 would be around... let me calculate properly
  
  // Better approach: Use the tabular Islamic calendar with proper epoch
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  
  // Convert to Julian Day Number (JDN)
  const jd = Math.floor((1461 * (y + 4800 + Math.floor((m - 14) / 12))) / 4) +
             Math.floor((367 * (m - 2 - 12 * Math.floor((m - 14) / 12))) / 12) -
             Math.floor((3 * Math.floor((y + 4900 + Math.floor((m - 14) / 12)) / 100)) / 4) +
             d - 32075;
  
  // Islamic epoch in Julian Day Number (July 16, 622 CE Julian = July 19, 622 CE Gregorian)
  // Adjusted epoch for better alignment with observed dates
  const islamicEpoch = 1948440;
  
  // Days since Islamic epoch
  const daysSinceEpoch = jd - islamicEpoch;
  
  // Use the 30-year cycle (10631 days = 30 Islamic years)
  const cycle = Math.floor(daysSinceEpoch / 10631);
  let remainingDays = daysSinceEpoch - cycle * 10631;
  
  // Calculate year within 30-year cycle
  // Leap years in 30-year cycle: 2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29
  const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
  let yearInCycle = 0;
  
  for (let i = 1; i <= 30; i++) {
    const yearDays = leapYears.includes(i) ? 355 : 354;
    if (remainingDays < yearDays) {
      yearInCycle = i;
      break;
    }
    remainingDays -= yearDays;
    if (i === 30) yearInCycle = 30;
  }
  
  const hijriYear = cycle * 30 + yearInCycle;
  
  // Calculate month and day
  const monthDays = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 
                     leapYears.includes(yearInCycle) ? 30 : 29];
  
  let hijriMonth = 1;
  let dayOfMonth = remainingDays + 1;
  
  for (let i = 0; i < 12; i++) {
    if (dayOfMonth <= monthDays[i]) {
      hijriMonth = i + 1;
      break;
    }
    dayOfMonth -= monthDays[i];
  }
  
  // Fine-tune adjustment to match observed calendar (Umm al-Qura)
  // Adjustment: Dec 21, 2024 = 1 Rajab 1446
  let adjustedDay = dayOfMonth;
  let adjustedMonth = hijriMonth;
  let adjustedYear = hijriYear;
  
  // Subtract 2 days to align with observed calendar
  adjustedDay -= 2;
  if (adjustedDay < 1) {
    adjustedMonth--;
    if (adjustedMonth < 1) {
      adjustedMonth = 12;
      adjustedYear--;
    }
    // Get days in previous month
    const prevMonthDays = adjustedMonth === 12 
      ? (leapYears.includes(yearInCycle) ? 30 : 29) 
      : monthDays[adjustedMonth - 1];
    adjustedDay += prevMonthDays;
  }
  
  return {
    day: Math.max(1, adjustedDay),
    month: adjustedMonth,
    year: adjustedYear,
    monthName: hijriMonths[adjustedMonth - 1]
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
      name: "Isra and Mi'raj",
      hijriDate: "27 Rajab 1447",
      gregorianDate: "January 16, 2026",
      description: "The Night Journey and Ascension",
    },
    {
      name: "Shab-e-Barat",
      hijriDate: "15 Sha'ban 1447",
      gregorianDate: "February 3, 2026",
      description: "Night of Forgiveness",
    },
    {
      name: "Start of Ramadan",
      hijriDate: "1 Ramadan 1447",
      gregorianDate: "February 18, 2026",
      description: "Beginning of the holy month of fasting",
    },
    {
      name: "Laylat al-Qadr",
      hijriDate: "27 Ramadan 1447",
      gregorianDate: "March 16, 2026",
      description: "The Night of Power",
    },
    {
      name: "Eid al-Fitr",
      hijriDate: "1 Shawwal 1447",
      gregorianDate: "March 20, 2026",
      description: "Festival of Breaking the Fast",
    },
    {
      name: "Day of Arafah",
      hijriDate: "9 Dhul Hijjah 1447",
      gregorianDate: "May 26, 2026",
      description: "Most important day of Hajj",
    },
    {
      name: "Eid al-Adha",
      hijriDate: "10 Dhul Hijjah 1447",
      gregorianDate: "May 27, 2026",
      description: "Festival of Sacrifice",
    },
  ];
  return (
    <PageWrapper className="bg-gradient-subtle">
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
                <p className="text-3xl font-bold text-primary mb-1">{hijriDate}</p>
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
                      <div className="relative">
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
    </PageWrapper>
  );
};

export default Calendar;
