import React, {useEffect, useState} from "react";


const useRerenderTest = () => {
  const [state, setState] = useState(0);
  useEffect(() => {
    let id = setTimeout(() => {
      setState(st => {
        return st + 1
      })
    }, 1000);
    return () => clearInterval((id));
  });
};

export default useRerenderTest;