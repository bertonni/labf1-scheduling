import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { db } from "../utils/firebase";
import { useAuth } from "./AuthContext";

const ScheduleContext = createContext();

export const useSchedule = () => {
  return useContext(ScheduleContext);
};

export function ScheduleProvider({ children }) {
  const [schedules, setSchedules] = useState([]);
  const [schedulesCount, setSchedulesCount] = useState(0);
  const [error, setError] = useState("");

  const { user } = useAuth();

  useEffect(async () => {
    if (user) {
      const data = [];

      const q = query(collection(db, "LAB-F1"), where("lab", "==", "LAB-F1"));
      const unsubscribe = await onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
      });

      await setSchedules(data);
      console.log("data updated");

      return () => {
        unsubscribe();
        console.log("unsubscribed");
      };
    }
  }, [schedulesCount]);

  const makeReservation = async (reservation) => {
    try {
      await setDoc(
        doc(
          db,
          reservation.lab,
          `${reservation.date}-${
            reservation.start < 10 ? "0" + reservation.start : reservation.start
          }`
        ),
        reservation
      );
      setSchedulesCount(schedulesCount + 1);
    } catch (e) {
      setError(e);
    }
  };

  const removeReservation = async (schedule) => {
    let errorMessage = "";
    const id = `${schedule.date}-${
      schedule.start < 10 ? "0" + schedule.start : schedule.start
    }`;

    await deleteDoc(doc(db, schedule.lab, id))
      .then((res) => {
        errorMessage = "";
      })
      .catch((err) => {
        if (err) {
          errorMessage =
            "Houve um erro ao executar a ação. Tente novamente mais tarde";
        }
      });

    if (errorMessage === "") setSchedulesCount(schedulesCount - 1);
    setError(errorMessage);
  };

  const memoedValues = useMemo(
    () => ({
      schedules,
      error,
      schedulesCount,
      setError,
      removeReservation,
      makeReservation,
    }),
    [schedules, schedulesCount, error]
  );

  return (
    <ScheduleContext.Provider value={memoedValues}>
      {children}
    </ScheduleContext.Provider>
  );
}
