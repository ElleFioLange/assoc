export function ascFn(
  question: string,
  toggleLoading: (loading: boolean) => void,
  setModalContent: React.Dispatch<React.SetStateAction<JSX.Element | null>>,
  setModalVis: React.Dispatch<React.SetStateAction<boolean>>
): void {

}

export function ansFn(
	answer: string,
  toggleLoading: (loading: boolean) => void,
  setModalContent: React.Dispatch<React.SetStateAction<JSX.Element | null>>,
  setModalVis: React.Dispatch<React.SetStateAction<boolean>>
) {

}

export async function callAscApi(question: string, map: TMap): Promise<string> {
  return "This is a placeholder answer while I build the api";
}
