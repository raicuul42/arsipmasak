import * as React from 'react';

import { Clock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { getArrowByType, getDateByType, setDateByType } from '@/lib/dtp';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export function TimePicker({ date, setDate }) {
    const minuteRef = React.useRef(null);
    const hourRef = React.useRef(null);
    const secondRef = React.useRef(null);

    return (
        <div className="flex items-end gap-2">
            <div className="grid gap-1 text-center">
                <Label htmlFor="hours" className="text-xs">
                    Hours
                </Label>
                <TimePickerInput picker="hours" date={date} setDate={setDate} ref={hourRef} onRightFocus={() => minuteRef.current?.focus()} />
            </div>
            <div className="grid gap-1 text-center">
                <Label htmlFor="minutes" className="text-xs">
                    Minutes
                </Label>
                <TimePickerInput
                    picker="minutes"
                    date={date}
                    setDate={setDate}
                    ref={minuteRef}
                    onLeftFocus={() => hourRef.current?.focus()}
                    onRightFocus={() => secondRef.current?.focus()}
                />
            </div>
            <div className="grid gap-1 text-center">
                <Label htmlFor="seconds" className="text-xs">
                    Seconds
                </Label>
                <TimePickerInput picker="seconds" date={date} setDate={setDate} ref={secondRef} onLeftFocus={() => minuteRef.current?.focus()} />
            </div>
            <div className="flex h-10 items-center">
                <Clock className="ml-2 h-4 w-4" />
            </div>
        </div>
    );
}

const TimePickerInput = React.forwardRef(
    (
        {
            className,
            type = 'tel',
            value,
            id,
            name,
            date = new Date(new Date().setHours(0, 0, 0, 0)),
            setDate,
            onChange,
            onKeyDown,
            picker,
            onLeftFocus,
            onRightFocus,
            ...props
        },
        ref,
    ) => {
        const [flag, setFlag] = React.useState(false);

        React.useEffect(() => {
            if (flag) {
                const timer = setTimeout(() => {
                    setFlag(false);
                }, 2000);

                return () => clearTimeout(timer);
            }
        }, [flag]);

        const calculatedValue = React.useMemo(() => getDateByType(date, picker), [date, picker]);

        const handleKeyDown = (e) => {
            if (e.key === 'Tab') return;
            e.preventDefault();
            if (e.key === 'ArrowRight') onRightFocus?.();
            if (e.key === 'ArrowLeft') onLeftFocus?.();
            if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
                const step = e.key === 'ArrowUp' ? 1 : -1;
                const newValue = getArrowByType(calculatedValue, step, picker);
                if (flag) setFlag(false);
                const tempDate = new Date(date);
                setDate(setDateByType(tempDate, newValue, picker));
            }
            if (e.key >= '0' && e.key <= '9') {
                const newValue = !flag ? '0' + e.key : calculatedValue.slice(1, 2) + e.key;
                if (flag) onRightFocus?.();
                setFlag((prev) => !prev);
                const tempDate = new Date(date);
                setDate(setDateByType(tempDate, newValue, picker));
            }
        };

        return (
            <Input
                ref={ref}
                id={id || picker}
                name={name || picker}
                className={cn(
                    'w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none',
                    className,
                )}
                value={value || calculatedValue}
                onChange={(e) => {
                    e.preventDefault();
                    onChange?.(e);
                }}
                type={type}
                inputMode="decimal"
                onKeyDown={(e) => {
                    onKeyDown?.(e);
                    handleKeyDown(e);
                }}
                {...props}
            />
        );
    },
);

TimePickerInput.displayName = 'TimePickerInput';

export { TimePickerInput };
