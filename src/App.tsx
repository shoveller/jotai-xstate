import "./App.css";
import {createMachine} from "xstate";
import { inspect } from "@xstate/inspect";
import {atomWithMachine} from "jotai-xstate";
import {atom, Provider, useAtomValue, useSetAtom} from "jotai";
import {useHydrateAtoms} from "jotai/utils";
import {FC, PropsWithChildren} from "react";

inspect()

const initialAtom = atom('녹색')
const createLightMachine = (initial: string) => createMachine<string>({
    id: 'light',
    // 초기 상태
    initial,
    states: {
        // 상태 1
        녹색: {
            description: '원의 색을 녹색으로 칠한다',
            // 상태 1의 트랜지션
            on: {
                // 액션이 발생했을때 가리킬 상태
                다음: '파란색'
            }
        },
        // 상태 2
        파란색: {
            description: '원의 색을 파란색으로 칠한다',
            // 상태 2의 트랜지션
            on: {
                // 액션이 발생했을때 가리킬 상태
                다음: '노란색'
            }
        },
        // 상태 3
        노란색: {
            description: '원의 색을 노란색으로 칠한다',
            // 상태 3의 트랜지션
            on: {
                // 액션이 발생했을때 가리킬 상태
                다음: '녹색'
            }
        }
    }
})

const lightMachineAtom = atomWithMachine((get) => createLightMachine(get(initialAtom)), {
    devTools: true
})

const fillAtom = atom((get) => {
    const state = get(lightMachineAtom).value;

    if (state === '녹색') {
        return 'green'
    }

    if (state === '파란색') {
        return 'blue'
    }

    return 'yellow'
})

function Circle() {
    const fill = useAtomValue(fillAtom)
    const send = useSetAtom(lightMachineAtom);

    return (
        <svg>
            <circle onClick={() => send('다음')} cx="50" cy="50" r="40" fill={fill}/>
        </svg>
    );
}


const HydrateAtoms: FC<PropsWithChildren> = ({ children }) => {
    // initialising on state with prop on render here
    useHydrateAtoms([[initialAtom, '노란색']])
    return children
}

function App() {
  return (
    <>
      <Provider>
        <Circle />
      </Provider>
      <Provider>
        <Circle />
      </Provider>
      <Provider>
        <HydrateAtoms>
          <Circle />
         </HydrateAtoms>
      </Provider>
    </>
  );
}

export default App;
