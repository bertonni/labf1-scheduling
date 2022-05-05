import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { db } from "../utils/firebase";
import { useAuth } from "./AuthContext";

const ScheduleContext = createContext();

export const useSchedule = () => {
  return useContext(ScheduleContext);
};

export function ScheduleProvider({ children }) {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [schedulesCount, setSchedulesCount] = useState(0);
  const [error, setError] = useState("");

  const getDataFromFirebase = async (arr, lab) => {
    const querySnapshot = await getDocs(collection(db, lab));
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
  };

  useEffect(async () => {
    if (user) {
      const data = [];
      try {
        await getDataFromFirebase(data, "LAB-F1");
      } catch (error) {
        console.log(error);
      }
      setSchedules(data);
      console.log('data updated');
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
    let updatedSchedules = [];
    let errorMessage = "";
    const id = `${schedule.date}-${schedule.start < 10 ? "0" + schedule.start : schedule.start}`

    await deleteDoc(doc(db, schedule.lab, id)).then((res) => {
      updatedSchedules = schedules.filter(
        (sched) => JSON.stringify(sched) !== JSON.stringify(schedule)
      );
    }).catch((err) => {
      if (err) {
        errorMessage = "Houve um erro ao executar a ação. Tente novamente mais tarde";
      }
    });

    if (errorMessage === "") setSchedulesCount(schedulesCount - 1);
    setError(errorMessage);
  };

  const memoedValues = useMemo(
    () => ({
      schedules,
      error,
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
