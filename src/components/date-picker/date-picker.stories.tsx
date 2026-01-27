import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./date-picker";
import { DateRangePicker } from "./date-range-picker";
import type { DateRange } from "./date-range-picker";
import { TimePicker } from "./time-picker";
import { YearPicker } from "./year-picker";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <div className="w-[339px]">
        <DatePicker
          label="Tanggal"
          placeholder="dd-mm-yyyy, hh:mm"
          helperText="Pilih tanggal dan waktu"
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
};

export const WithDateTime: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="w-[339px]">
        <DatePicker
          label="Tanggal & Waktu"
          placeholder="dd-mm-yyyy, hh:mm"
          helperText="Tanggal dan waktu dipilih"
          showTime={true}
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
};

export const DateOnly: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <div className="w-[339px]">
        <DatePicker
          label="Tanggal Saja"
          placeholder="dd-mm-yyyy"
          helperText="Tanpa pemilihan waktu"
          showTime={false}
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
};

export const WithSuffix: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <div className="w-[339px]">
        <DatePicker
          label="Umur"
          placeholder="dd-mm-yyyy"
          helperText="Masukkan tanggal lahir"
          showTime={false}
          suffixText="Years"
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
};

export const WithoutSuffix: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <div className="w-[339px]">
        <DatePicker
          label="Tanggal"
          placeholder="dd-mm-yyyy, hh:mm"
          helperText="Tanpa suffix text"
          showTime={true}
          suffixText=""
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="w-[339px]">
        <DatePicker
          label="Tanggal"
          placeholder="dd-mm-yyyy, hh:mm"
          helperText="Field tidak dapat diubah"
          disabled
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <div className="w-[339px]">
        <DatePicker
          label="Tanggal"
          placeholder="dd-mm-yyyy, hh:mm"
          helperText="Tanggal harus dipilih"
          error
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
};

export const PreselectedDate: Story = {
  render: () => {
    const preselectedDate = new Date(2025, 1, 6, 9, 30); // Feb 6, 2025, 09:30
    const [date, setDate] = useState<Date | undefined>(preselectedDate);
    return (
      <div className="w-[339px]">
        <DatePicker
          label="Tanggal Meeting"
          placeholder="dd-mm-yyyy, hh:mm"
          helperText="Tanggal meeting sudah ditentukan"
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
};

export const CustomSuffix: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <div className="w-[339px]">
        <DatePicker
          label="Durasi Kontrak"
          placeholder="dd-mm-yyyy"
          helperText="Tanggal mulai kontrak"
          showTime={false}
          suffixText="Bulan"
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const [defaultDate, setDefaultDate] = useState<Date | undefined>(undefined);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      new Date()
    );
    const [errorDate, setErrorDate] = useState<Date | undefined>(undefined);
    const [disabledDate, setDisabledDate] = useState<Date | undefined>(
      new Date()
    );

    return (
      <div className="w-[1200px] space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="mb-2 text-sm font-medium">Default (Empty)</h4>
            <DatePicker
              label="Tanggal"
              placeholder="dd-mm-yyyy, hh:mm"
              helperText="Pilih tanggal dan waktu"
              value={defaultDate}
              onChange={setDefaultDate}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">With Selected Date</h4>
            <DatePicker
              label="Tanggal"
              placeholder="dd-mm-yyyy, hh:mm"
              helperText="Tanggal sudah dipilih"
              value={selectedDate}
              onChange={setSelectedDate}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Error State</h4>
            <DatePicker
              label="Tanggal"
              placeholder="dd-mm-yyyy, hh:mm"
              helperText="Tanggal harus dipilih"
              error
              value={errorDate}
              onChange={setErrorDate}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Disabled</h4>
            <DatePicker
              label="Tanggal"
              placeholder="dd-mm-yyyy, hh:mm"
              helperText="Field tidak dapat diubah"
              disabled
              value={disabledDate}
              onChange={setDisabledDate}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const RealWorldExample: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
    const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(
      new Date(2025, 1, 15, 10, 0)
    );
    const [startDateError, setStartDateError] = useState(false);

    const handleStartDateChange = (date: Date | undefined) => {
      if (date && endDate && date > endDate) {
        setStartDateError(true);
      } else {
        setStartDateError(false);
        setStartDate(date);
      }
    };

    return (
      <div className="w-[600px] space-y-6">
        <h3 className="text-lg font-semibold">Form Pendaftaran Event</h3>

        <DatePicker
          label="Tanggal Mulai"
          placeholder="dd-mm-yyyy, hh:mm"
          helperText={
            startDateError
              ? "Tanggal mulai tidak boleh setelah tanggal selesai"
              : "Pilih tanggal dan waktu mulai event"
          }
          error={startDateError}
          value={startDate}
          onChange={handleStartDateChange}
        />

        <DatePicker
          label="Tanggal Selesai"
          placeholder="dd-mm-yyyy, hh:mm"
          helperText="Pilih tanggal dan waktu selesai event"
          value={endDate}
          onChange={setEndDate}
        />

        <DatePicker
          label="Tanggal Lahir"
          placeholder="dd-mm-yyyy"
          helperText="Masukkan tanggal lahir Anda"
          showTime={false}
          suffixText="Years"
          value={birthDate}
          onChange={setBirthDate}
        />

        <DatePicker
          label="Jadwal Appointment"
          placeholder="dd-mm-yyyy, hh:mm"
          helperText="Appointment telah dijadwalkan"
          value={appointmentDate}
          onChange={setAppointmentDate}
        />

        <DatePicker
          label="Tanggal Sebelumnya (Disabled)"
          placeholder="dd-mm-yyyy, hh:mm"
          helperText="Field ini tidak dapat diubah"
          disabled
          value={new Date(2024, 11, 1, 9, 0)}
        />
      </div>
    );
  },
};

export const InForm: Story = {
  render: () => {
    const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
      undefined
    );

    return (
      <div className="w-[500px] space-y-6">
        <h3 className="text-lg font-semibold">Booking Hotel</h3>

        <div className="space-y-4 rounded-lg border border-border bg-white p-6">
          <DatePicker
            label="Check-In"
            placeholder="dd-mm-yyyy, hh:mm"
            helperText="Tanggal dan waktu check-in"
            value={checkInDate}
            onChange={setCheckInDate}
          />

          <DatePicker
            label="Check-Out"
            placeholder="dd-mm-yyyy, hh:mm"
            helperText="Tanggal dan waktu check-out"
            value={checkOutDate}
            onChange={setCheckOutDate}
          />

          <button
            type="button"
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Cari Kamar Tersedia
          </button>
        </div>
      </div>
    );
  },
};

export const WithDifferentWidths: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date | undefined>(undefined);
    const [date2, setDate2] = useState<Date | undefined>(undefined);
    const [date3, setDate3] = useState<Date | undefined>(undefined);

    return (
      <div className="space-y-6">
        <div>
          <h4 className="mb-2 text-sm font-medium">Small (w-64)</h4>
          <DatePicker
            label="Tanggal"
            placeholder="dd-mm-yyyy"
            showTime={false}
            className="w-64"
            value={date1}
            onChange={setDate1}
          />
        </div>

        <div>
          <h4 className="mb-2 text-sm font-medium">Medium (w-80)</h4>
          <DatePicker
            label="Tanggal"
            placeholder="dd-mm-yyyy, hh:mm"
            className="w-80"
            value={date2}
            onChange={setDate2}
          />
        </div>

        <div className="w-full">
          <h4 className="mb-2 text-sm font-medium">Full Width (w-full)</h4>
          <DatePicker
            label="Tanggal"
            placeholder="dd-mm-yyyy, hh:mm"
            value={date3}
            onChange={setDate3}
          />
        </div>
      </div>
    );
  },
};

// DateRangePicker Stories
export const RangePickerDefault: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    return (
      <div className="w-[400px]">
        <DateRangePicker
          label="Pilih Rentang Tanggal"
          placeholder="Pilih tanggal"
          helperText="Klik untuk memilih rentang tanggal"
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

export const RangePickerWithPresets: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    return (
      <div className="w-[400px]">
        <DateRangePicker
          label="Filter Tanggal"
          placeholder="Pilih tanggal"
          helperText="Gunakan preset atau pilih manual"
          showPresets={true}
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

export const RangePickerWithoutPresets: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    return (
      <div className="w-[400px]">
        <DateRangePicker
          label="Rentang Tanggal"
          placeholder="Pilih tanggal"
          helperText="Pilih tanggal awal dan akhir"
          showPresets={false}
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

export const RangePickerSingleMonth: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    return (
      <div className="w-[400px]">
        <DateRangePicker
          label="Rentang Tanggal"
          placeholder="Pilih tanggal"
          helperText="Kalender satu bulan"
          showPresets={false}
          numberOfMonths={1}
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

export const RangePickerPreselected: Story = {
  render: () => {
    const preselectedRange: DateRange = {
      from: new Date(2025, 0, 15),
      to: new Date(2025, 1, 8),
    };
    const [range, setRange] = useState<DateRange | undefined>(preselectedRange);
    return (
      <div className="w-[400px]">
        <DateRangePicker
          label="Periode Laporan"
          placeholder="Pilih tanggal"
          helperText="Rentang tanggal sudah dipilih"
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

export const RangePickerDisabled: Story = {
  render: () => {
    const preselectedRange: DateRange = {
      from: new Date(2025, 0, 1),
      to: new Date(2025, 0, 31),
    };
    return (
      <div className="w-[400px]">
        <DateRangePicker
          label="Periode Laporan"
          placeholder="Pilih tanggal"
          helperText="Field tidak dapat diubah"
          disabled
          value={preselectedRange}
        />
      </div>
    );
  },
};

export const RangePickerError: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    return (
      <div className="w-[400px]">
        <DateRangePicker
          label="Periode Laporan"
          placeholder="Pilih tanggal"
          helperText="Rentang tanggal harus dipilih"
          error
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

export const RangePickerCustomPresets: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>(undefined);

    const customPresets = [
      {
        label: "Hari ini",
        getValue: () => {
          const today = new Date();
          return { from: today, to: today };
        },
      },
      {
        label: "Kemarin",
        getValue: () => {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          return { from: yesterday, to: yesterday };
        },
      },
      {
        label: "Minggu ini",
        getValue: () => {
          const today = new Date();
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay() + 1);
          return { from: startOfWeek, to: today };
        },
      },
      {
        label: "Bulan ini",
        getValue: () => {
          const today = new Date();
          const startOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
          );
          return { from: startOfMonth, to: today };
        },
      },
    ];

    return (
      <div className="w-[400px]">
        <DateRangePicker
          label="Filter Waktu"
          placeholder="Pilih tanggal"
          helperText="Dengan preset kustom"
          presets={customPresets}
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

export const RangePickerInForm: Story = {
  render: () => {
    const [bookingRange, setBookingRange] = useState<DateRange | undefined>(
      undefined
    );
    const [reportRange, setReportRange] = useState<DateRange | undefined>(
      undefined
    );

    return (
      <div className="w-[500px] space-y-6">
        <h3 className="text-lg font-semibold">Form dengan Date Range Picker</h3>

        <div className="space-y-4 rounded-lg border border-border bg-white p-6">
          <DateRangePicker
            label="Periode Booking"
            placeholder="Check-in - Check-out"
            helperText="Pilih tanggal check-in dan check-out"
            showPresets={false}
            value={bookingRange}
            onChange={setBookingRange}
          />

          <DateRangePicker
            label="Periode Laporan"
            placeholder="Pilih rentang"
            helperText="Filter data berdasarkan tanggal"
            value={reportRange}
            onChange={setReportRange}
          />

          <button
            type="button"
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Submit
          </button>
        </div>
      </div>
    );
  },
};

export const RangePickerAllStates: Story = {
  render: () => {
    const [defaultRange, setDefaultRange] = useState<DateRange | undefined>(
      undefined
    );
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
      from: new Date(2025, 0, 15),
      to: new Date(2025, 1, 8),
    });
    const [errorRange, setErrorRange] = useState<DateRange | undefined>(
      undefined
    );

    return (
      <div className="w-[1200px] space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="mb-2 text-sm font-medium">Default (Empty)</h4>
            <DateRangePicker
              label="Rentang Tanggal"
              placeholder="Pilih tanggal"
              helperText="Klik untuk memilih"
              value={defaultRange}
              onChange={setDefaultRange}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">With Selected Range</h4>
            <DateRangePicker
              label="Rentang Tanggal"
              placeholder="Pilih tanggal"
              helperText="Rentang sudah dipilih"
              value={selectedRange}
              onChange={setSelectedRange}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Error State</h4>
            <DateRangePicker
              label="Rentang Tanggal"
              placeholder="Pilih tanggal"
              helperText="Rentang tanggal harus dipilih"
              error
              value={errorRange}
              onChange={setErrorRange}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Disabled</h4>
            <DateRangePicker
              label="Rentang Tanggal"
              placeholder="Pilih tanggal"
              helperText="Field tidak dapat diubah"
              disabled
              value={{
                from: new Date(2025, 0, 1),
                to: new Date(2025, 0, 31),
              }}
            />
          </div>
        </div>
      </div>
    );
  },
};

// YearPicker Stories
export const YearPickerDefault: Story = {
  render: () => {
    const [year, setYear] = useState<number | undefined>(undefined);
    return (
      <div className="w-[300px]">
        <YearPicker
          label="Tahun"
          placeholder="Pilih tahun"
          helperText="Pilih tahun yang diinginkan"
          value={year}
          onChange={setYear}
        />
      </div>
    );
  },
};

export const YearPickerWithValue: Story = {
  render: () => {
    const [year, setYear] = useState<number | undefined>(2024);
    return (
      <div className="w-[300px]">
        <YearPicker
          label="Tahun Lahir"
          placeholder="Pilih tahun"
          helperText="Tahun lahir sudah dipilih"
          value={year}
          onChange={setYear}
        />
      </div>
    );
  },
};

export const YearPickerCustomRange: Story = {
  render: () => {
    const [year, setYear] = useState<number | undefined>(undefined);
    return (
      <div className="w-[300px]">
        <YearPicker
          label="Tahun Akademik"
          placeholder="Pilih tahun"
          helperText="Rentang 2020-2030"
          minYear={2020}
          maxYear={2030}
          value={year}
          onChange={setYear}
        />
      </div>
    );
  },
};

export const YearPickerDisabled: Story = {
  render: () => {
    return (
      <div className="w-[300px]">
        <YearPicker
          label="Tahun"
          placeholder="Pilih tahun"
          helperText="Field tidak dapat diubah"
          disabled
          value={2025}
        />
      </div>
    );
  },
};

export const YearPickerError: Story = {
  render: () => {
    const [year, setYear] = useState<number | undefined>(undefined);
    return (
      <div className="w-[300px]">
        <YearPicker
          label="Tahun"
          placeholder="Pilih tahun"
          helperText="Tahun harus dipilih"
          error
          value={year}
          onChange={setYear}
        />
      </div>
    );
  },
};

export const YearPickerAllStates: Story = {
  render: () => {
    const [defaultYear, setDefaultYear] = useState<number | undefined>(
      undefined
    );
    const [selectedYear, setSelectedYear] = useState<number | undefined>(2025);
    const [errorYear, setErrorYear] = useState<number | undefined>(undefined);

    return (
      <div className="w-[800px] space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="mb-2 text-sm font-medium">Default (Empty)</h4>
            <YearPicker
              label="Tahun"
              placeholder="Pilih tahun"
              helperText="Klik untuk memilih"
              value={defaultYear}
              onChange={setDefaultYear}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">With Selected Year</h4>
            <YearPicker
              label="Tahun"
              placeholder="Pilih tahun"
              helperText="Tahun sudah dipilih"
              value={selectedYear}
              onChange={setSelectedYear}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Error State</h4>
            <YearPicker
              label="Tahun"
              placeholder="Pilih tahun"
              helperText="Tahun harus dipilih"
              error
              value={errorYear}
              onChange={setErrorYear}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Disabled</h4>
            <YearPicker
              label="Tahun"
              placeholder="Pilih tahun"
              helperText="Field tidak dapat diubah"
              disabled
              value={2025}
            />
          </div>
        </div>
      </div>
    );
  },
};

// TimePicker Stories
export const TimePickerDefault: Story = {
  render: () => {
    const [time, setTime] = useState<
      { hours: number; minutes: number } | undefined
    >(undefined);
    return (
      <div className="w-[300px]">
        <TimePicker
          label="Waktu"
          placeholder="hh:mm"
          helperText="Pilih waktu yang diinginkan"
          value={time}
          onChange={setTime}
        />
      </div>
    );
  },
};

export const TimePickerWithValue: Story = {
  render: () => {
    const [time, setTime] = useState<
      { hours: number; minutes: number } | undefined
    >({ hours: 14, minutes: 30 });
    return (
      <div className="w-[300px]">
        <TimePicker
          label="Jam Meeting"
          placeholder="hh:mm"
          helperText="Waktu meeting sudah dipilih"
          value={time}
          onChange={setTime}
        />
      </div>
    );
  },
};

export const TimePickerDisabled: Story = {
  render: () => {
    return (
      <div className="w-[300px]">
        <TimePicker
          label="Waktu"
          placeholder="hh:mm"
          helperText="Field tidak dapat diubah"
          disabled
          value={{ hours: 9, minutes: 0 }}
        />
      </div>
    );
  },
};

export const TimePickerError: Story = {
  render: () => {
    const [time, setTime] = useState<
      { hours: number; minutes: number } | undefined
    >(undefined);
    return (
      <div className="w-[300px]">
        <TimePicker
          label="Waktu"
          placeholder="hh:mm"
          helperText="Waktu harus dipilih"
          error
          value={time}
          onChange={setTime}
        />
      </div>
    );
  },
};

export const TimePickerAllStates: Story = {
  render: () => {
    const [defaultTime, setDefaultTime] = useState<
      { hours: number; minutes: number } | undefined
    >(undefined);
    const [selectedTime, setSelectedTime] = useState<
      { hours: number; minutes: number } | undefined
    >({ hours: 10, minutes: 30 });
    const [errorTime, setErrorTime] = useState<
      { hours: number; minutes: number } | undefined
    >(undefined);

    return (
      <div className="w-[800px] space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="mb-2 text-sm font-medium">Default (Empty)</h4>
            <TimePicker
              label="Waktu"
              placeholder="hh:mm"
              helperText="Klik untuk memilih"
              value={defaultTime}
              onChange={setDefaultTime}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">With Selected Time</h4>
            <TimePicker
              label="Waktu"
              placeholder="hh:mm"
              helperText="Waktu sudah dipilih"
              value={selectedTime}
              onChange={setSelectedTime}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Error State</h4>
            <TimePicker
              label="Waktu"
              placeholder="hh:mm"
              helperText="Waktu harus dipilih"
              error
              value={errorTime}
              onChange={setErrorTime}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Disabled</h4>
            <TimePicker
              label="Waktu"
              placeholder="hh:mm"
              helperText="Field tidak dapat diubah"
              disabled
              value={{ hours: 9, minutes: 0 }}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const TimePickerInForm: Story = {
  render: () => {
    const [startTime, setStartTime] = useState<
      { hours: number; minutes: number } | undefined
    >(undefined);
    const [endTime, setEndTime] = useState<
      { hours: number; minutes: number } | undefined
    >(undefined);

    return (
      <div className="w-[400px] space-y-6">
        <h3 className="text-lg font-semibold">Jadwal Kerja</h3>

        <div className="space-y-4 rounded-lg border border-border bg-white p-6">
          <TimePicker
            label="Jam Masuk"
            placeholder="hh:mm"
            helperText="Waktu mulai kerja"
            value={startTime}
            onChange={setStartTime}
          />

          <TimePicker
            label="Jam Pulang"
            placeholder="hh:mm"
            helperText="Waktu selesai kerja"
            value={endTime}
            onChange={setEndTime}
          />

          <button
            type="button"
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Simpan Jadwal
          </button>
        </div>
      </div>
    );
  },
};
