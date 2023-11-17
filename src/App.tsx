import "./App.css";
import {createMachine} from "xstate";
import { inspect } from "@xstate/inspect";
import {atomWithMachine} from "jotai-xstate";
import {atom, Provider, useAtom, useAtomValue, useSetAtom} from "jotai";
import {FC, useEffect} from "react";

inspect()

const createLightMachine = (initial: string) => createMachine<string>({
    predictableActionArguments: true,
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

const lightMachineAtomAtom = atom(atomWithMachine(createLightMachine("녹색"), {
    devTools: true
}))

const fillAtom = atom((get) => {
    const lightMachineAtom = get(lightMachineAtomAtom)
    const state = get(lightMachineAtom).value;

    if (state === '녹색') {
        return 'green'
    }

    if (state === '파란색') {
        return 'blue'
    }

    return 'yellow'
})

const Circle: FC<{ color?: '녹색' | '파란색' | '노란색' }> = ({ color = '녹색' }) => {
    const fill = useAtomValue(fillAtom)
    const [lightMachineAtom, setLightMachineAtom] = useAtom(lightMachineAtomAtom)
    useEffect(() => {
        setLightMachineAtom(atomWithMachine(createLightMachine(color), {
            devTools: true
        }))
    }, [color, setLightMachineAtom]);
    const send = useSetAtom(lightMachineAtom);

    return (
        <svg>
            <circle onClick={() => send('다음')} cx="50" cy="50" r="40" fill={fill}/>
        </svg>
    );
}

function App() {
  const color = new URL(location.href).searchParams.get('color') as '녹색' | '파란색' | '노란색'

  return (
    <>
      <Provider>
        <Circle color={color} />
      </Provider>
      <Provider>
        <Circle />
      </Provider>
    </>
  );
}

export default App;
