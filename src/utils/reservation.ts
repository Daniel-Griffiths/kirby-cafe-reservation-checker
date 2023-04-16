import axios from "axios";
import dayjs from "dayjs";

type CalendarResponse = Record<string, Record<string, 0 | 1>>;

export interface Reservation {
  date: string;
  time: string;
  isAvailable: boolean;
  formattedDate: string;
}

export async function getReservations(): Promise<Reservation[]> {
  const response = await axios.get<CalendarResponse>(
    `https://kirbycafe-reserve.com/api/guest/reserve/calendar?shop_id=1&month=${process.env.RESERVATION_MONTH}&quantity=${process.env.RESERVATION_QUANTITY}`,
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua":
          '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-kbcf": "kbcf",
        "x-language": "en",
        Referer: "https://kirbycafe-reserve.com/guest/tokyo/reserve/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    }
  );

  if (!response.data) {
    throw new Error("No data returned from the Kirby Cafe API");
  }

  return Object.entries(response.data.calendar || [])
    .flatMap(([date, times]) => {
      return Object.entries(times).flatMap(([time, availabilityNumber]) => {
        const isSlotAvailable = availabilityNumber === 1;
        const isSlotTomorrow = dayjs(`${date} ${time}`).isAfter(dayjs());
        const formattedDate = dayjs(`${date} ${time}`).format(
          "MMM DD YYYY - h:mma"
        );

        return {
          date,
          time,
          formattedDate,
          isAvailable: isSlotAvailable && isSlotTomorrow,
        };
      });
    })
    .filter((date) => {
      return date.isAvailable;
    });
}
