import { Fragment } from "react";

const CodeTemplate = () => {
  return (
    <Fragment>
      <div className="flex px-2 sm:px-5">
        <pre className="text-sm sm:text-base pt-4 text-purple-400">{`while (`}</pre>
        <pre className="text-sm sm:text-base pt-4 text-red-400">{`!`}</pre>
        <pre className="text-sm sm:text-base pt-4 text-yellow-200">{`goalAchieved`}</pre>
        <pre className="text-sm sm:text-base pt-4 text-blue-200">{`()`}</pre>
        <pre className="text-sm sm:text-base pt-4 text-purple-400">{`)`}</pre>

        <pre className="hidden sm:block text-base pt-4 text-purple-400">{` {`}</pre>
        <pre className="hidden sm:block text-base pt-4 text-yellow-200">{` tryAgain`}</pre>
        <pre className="hidden sm:block text-base pt-4 text-blue-200">{`()`}</pre>
        <pre className="hidden sm:block text-base pt-4 text-white">{`;`}</pre>
        <pre className="hidden sm:block text-base pt-4 text-purple-400">{` }`}</pre>
      </div>
      <div className="sm:hidden flex -mt-2 px-2">
        <pre className="text-sm pt-3 text-yellow-200">{`    tryAgain`}</pre>
        <pre className="text-sm pt-3 text-blue-200">{`()`}</pre>
        <pre className="text-sm pt-3 text-white">{`;`}</pre>
      </div>
      <div className="sm:hidden flex -mt-2 px-2">
        <pre className="text-sm pt-3 text-purple-400">{`}`}</pre>
      </div>
    </Fragment>
  );
};
export default CodeTemplate;
