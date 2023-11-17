import "./App.css";
import {createMachine} from "xstate";
import { inspect } from "@xstate/inspect";
import {atomWithMachine} from "jotai-xstate";
import {useAtom} from "jotai";

inspect()

const lightMachine= createMachine<string>({
    id: 'light',
    // 초기 상태
    initial: 'green',
    states: {
        // 상태 1
        green: {
            description: '원의 색을 녹색으로 칠한다',
            // 상태 1의 트랜지션
            on: {
                // 액션이 발생했을때 가리킬 상태
                다음: 'blue'
            }
        },
        // 상태 2
        blue: {
            description: '원의 색을 파란색으로 칠한다',
            // 상태 2의 트랜지션
            on: {
                // 액션이 발생했을때 가리킬 상태
                다음: 'yellow'
            }
        },
        // 상태 3
        yellow: {
            description: '원의 색을 노란색으로 칠한다',
            // 상태 3의 트랜지션
            on: {
                // 액션이 발생했을때 가리킬 상태
                다음: 'green'
            }
        }
    }
})

const lightMachineAtom = atomWithMachine(lightMachine, {
    devTools: true
})

function App() {
  const [state, send] = useAtom(lightMachineAtom);

  return (
    <svg>
      <circle onClick={() => send('다음')} cx="50" cy="50" r="40" fill={state.value as string} />
    </svg>
  );
}

export default App;
