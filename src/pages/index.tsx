import { Inter } from "next/font/google";
import { getReservations, Reservation } from "@/utils/reservation";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  availableReservations = [],
}: {
  availableReservations: Reservation[];
}) {
  return (
    <>
      <Head>
        <title>Kirby Cafe Reservation Checker</title>
      </Head>
      <h2
        className={`${inter.className} md:text-4xl text-center font-bold text-[#5c4c45] pb-5 text-2xl`}
      >
        ★ Available Reservations ★
      </h2>
      {availableReservations.length === 0 && (
        <p className={`${inter.className} text-2xl text-center text-[#5c4c45]`}>
          {"No reservations available"}
        </p>
      )}

      {availableReservations.map((reservation, key) => (
        <p
          key={key}
          className={`${inter.className} bg-white p-5 text-2xl rounded-lg mb-5 text-center`}
        >
          {reservation.formattedDate}
        </p>
      ))}
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      availableReservations: await getReservations(),
    },
  };
}
