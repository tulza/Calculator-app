import { ThemeUtils } from "@/entities/ThemeUtils";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CalculatorComponent = () => {
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center text-[32px]">
      <div className="flex h-min w-[330px] min-w-0 flex-col md:w-[540px]">
        <CalcHeader className="mb-[30px] select-none" />
        <CalculatorBody />
      </div>
    </div>
  );
};

const CalcHeader = ({ className }: { className?: string }) => {
  const [Theme, setTheme] = useState<number>(1);
  const HandleSetTheme = (num: number) => {
    ThemeUtils.SetTheme(String(num));
    setTheme(num);
  };

  const getAnimation = () => {
    if (Theme === 1) {
      return { left: "0.5rem" };
    } else if (Theme === 2) {
      return { left: "50%", x: "-50%" };
    } else if (Theme === 3) {
      return { left: "100%", x: "-150%" };
    }
  };

  return (
    <div
      className={clsx(
        "flex h-[50px] w-full items-end justify-between",
        `${className}`,
      )}
    >
      <p className="leading-[2rem]">calc</p>
      <div className="flex items-end gap-6 text-[12px] md:text-[16px]">
        <p className="">THEME</p>
        <div className="flex flex-col">
          <div className="flex justify-evenly">
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div className="relative mx-1.5 flex h-[28px] w-[72px] items-center rounded-full bg-Toggle">
            <motion.div
              className="pointer-events-none absolute h-[18px] w-[18px] rounded-full bg-Key3"
              animate={getAnimation()}
              initial={getAnimation()}
            />
            <div
              className="h-full w-full cursor-pointer"
              onClick={() => HandleSetTheme(1)}
            />
            <div
              className="h-full w-full cursor-pointer"
              onClick={() => HandleSetTheme(2)}
            />
            <div
              className="h-full w-full cursor-pointer"
              onClick={() => HandleSetTheme(3)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CalculatorBody = () => {
  const [Value, setValue] = useState("399981");
  const [DisplayedValue, setDisplayed] = useState<any>([]);
  const [Error, setError] = useState("");
  // yoinked from reddit
  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const HandleAddNumber = (val: string) => {
    if (val == "+" || val == "-" || val == "x" || val == "/") {
      if (Value[Value.length - 1] == ",") return;
      setValue(Value + `,${val},`);
      return;
    }
    if (
      (Value[Value.length - 1] === "," ||
        Value[Value.length - 1] === undefined) &&
      val == "0"
    ) {
      return;
    } else {
      setValue(Value + val);
    }
  };

  const HandleDelete = () => {
    if (Value[Value.length - 1] == ",")
      setValue(Value.slice(0, Value.length - 3));
    else {
      setValue(Value.slice(0, Value.length - 1));
    }
  };

  const HandleReset = () => {
    setValue("");
  };

  const HandleEqual = () => {
    try {
      const equation = Value.split(",").join("").replace("x", "*");
      const evaluate = eval(equation).toFixed(3);
      setValue(String(evaluate));
    } catch (e: any) {
      setError(e.name);
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  const HandleDisplayed = () => {
    const displayedValue = Value.split(",").map((val) => {
      console.log(val);
      if (val.length == 0) return;
      if (isNaN(Number(val))) return val;
      const newVal = numberWithCommas(Number(val));
      return newVal;
    });
    if (displayedValue.length == 1) {
      if (displayedValue[0] === "0") {
        setDisplayed([]);
        return;
      }
    }
    setDisplayed(displayedValue);
  };

  useEffect(() => {
    HandleDisplayed();
  }, [Value]);
  useEffect(() => {
    console.log(DisplayedValue);
  }, [DisplayedValue]);
  return (
    <>
      <div className="relative mb-6 flex h-[90px] w-full items-center justify-end overflow-hidden rounded-lg bg-Screen pr-8 text-[40px] md:h-[130px] md:text-[50px]">
        {Error ? Error : DisplayedValue}
      </div>
      <div className="grid h-[420px] w-full select-none rounded-lg bg-Keypad p-6 md:h-[480px] md:p-8">
        <div className="grid h-full justify-between [align-content:_space-between] [grid-template-columns:_repeat(4,_60px)] md:[grid-template-columns:_repeat(4,_100px)]">
          <Button OnClick={HandleAddNumber} keyVal="7" />
          <Button OnClick={HandleAddNumber} keyVal="8" />
          <Button OnClick={HandleAddNumber} keyVal="9" />
          <Button OnClick={HandleDelete} keyVal="DEL" type="Function" />
          <Button OnClick={HandleAddNumber} keyVal="4" />
          <Button OnClick={HandleAddNumber} keyVal="5" />
          <Button OnClick={HandleAddNumber} keyVal="6" />
          <Button OnClick={HandleAddNumber} keyVal="+" />
          <Button OnClick={HandleAddNumber} keyVal="1" />
          <Button OnClick={HandleAddNumber} keyVal="2" />
          <Button OnClick={HandleAddNumber} keyVal="3" />
          <Button OnClick={HandleAddNumber} keyVal="-" />
          <Button OnClick={HandleAddNumber} keyVal="." />
          <Button OnClick={HandleAddNumber} keyVal="0" />
          <Button OnClick={HandleAddNumber} keyVal="/" />
          <Button OnClick={HandleAddNumber} keyVal="x" />
          <Button
            OnClick={HandleReset}
            columnSpan={2}
            keyVal="RESET"
            type="Function"
          />
          <Button
            OnClick={HandleEqual}
            columnSpan={2}
            keyVal="="
            type="Equal"
          />
        </div>
      </div>
    </>
  );
};
type ButtonTypes = {
  keyVal: string;
  columnSpan?: number;
  type?: "Normal" | "Function" | "Equal";
  OnClick: (val?: any) => void; //idk what type for this
};

const Button = ({
  keyVal,
  columnSpan = 1,
  type = "Normal",
  OnClick,
}: ButtonTypes) => {
  return (
    <>
      <div
        className={"relative z-10 h-max w-full"}
        style={{ gridColumn: `span ${columnSpan}` }}
      >
        <div
          className={clsx(
            "absolute -z-10 h-[60px] w-full rounded-lg bg-KeyShadow",
            type == "Normal" && "bg-KeyShadow",
            type == "Function" && "bg-KeyShadow2",
            type == "Equal" && "bg-KeyShadow3",
          )}
        />
        <div
          className={clsx(
            "pointer-events-none absolute z-10 flex h-[60px] w-full items-center justify-center rounded-lg",
            type == "Normal" && "md: text-KeyText",
            type == "Function" && "text-[20px] text-FuncKey md:text-[32px] ",
            type == "Equal" && "text-[20px] text-EqualText md:text-[32px] ",
          )}
        >
          {keyVal}
        </div>
        <motion.div
          className={clsx(
            "z-20 flex h-[60px] w-full cursor-pointer items-center justify-center rounded-lg text-[2rem]",
            "hover:brightness-150",
            type == "Normal" && "bg-Key",
            type == "Function" && "bg-Key2",
            type == "Equal" && "bg-Key3",
          )}
          initial={{ y: -4 }}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          transition={{ duration: 0.1, type: "spring" }}
          onClick={() => {
            if (type == "Normal") {
              OnClick(keyVal);
            } else if (type == "Function" || type == "Equal") {
              OnClick();
            }
          }}
        ></motion.div>
      </div>
    </>
  );
};

export default CalculatorComponent;
