import { Select as BaseSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function Select({ options, placeholder = 'Select an options', ...props }) {
    return (
        <BaseSelect {...props}>
            <SelectTrigger className="mr-2 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option, index) => (
                    <SelectItem key={index} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </BaseSelect>
    );
}
