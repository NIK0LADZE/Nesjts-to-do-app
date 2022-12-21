import {registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export const Match = (property: string, validationOptions?: ValidationOptions) => {
    return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'Match',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: string, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    return value === relatedValue;
                }
            }
        })
    }
}