declare module Models.ViewModel {
    interface JSONReturnVM<T> {
        element: T;
        errormessage: string;
        haserror: boolean;
    }
}
