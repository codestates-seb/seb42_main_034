import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;