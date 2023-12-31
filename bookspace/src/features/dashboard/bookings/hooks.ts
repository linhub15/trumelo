import { supabase } from "@/src/supabase";
import { Enums, TablesInsert } from "@/src/types/supabase_types";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAddBooking() {
  const mutation = useMutation({
    mutationFn: async (booking: TablesInsert<"room_booking">) => {
      const { error } = await supabase.from("room_booking")
        .insert(booking);
      if (error) {
        alert(error.message);
        throw error;
      }
    },
  });

  return mutation;
}

export function useAddBookingForm() {
  const form = useForm({
    defaultValues: {
      thing: "",
    },
    onSubmit: async () => {
    },
  });

  return form;
}

export function useRoomBooking(bookingId: string) {
  return useQuery({
    queryKey: ["room_bookings", bookingId],
    queryFn: async () => {
      const { data, error } = await supabase.from("room_booking").select("*")
        .eq(
          "id",
          bookingId,
        );

      if (error) {
        alert(error.message);
        return;
      }

      return data.at(0);
    },
  });
}

export function useSetRoomBookingStatus(bookingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      args: { status: Enums<"room_booking_status"> },
    ) => {
      const { error } = await supabase.from("room_booking").update({
        status: args.status,
      }).eq(
        "id",
        bookingId,
      );

      if (error) {
        alert(error.message);
      }

      queryClient.invalidateQueries({ queryKey: ["room_bookings"] });
    },
  });
}
