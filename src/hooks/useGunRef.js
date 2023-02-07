import Gun from "gun";
import { API } from "../backend";

const gun = Gun({
  peers: [`${API}/gun`],
});

const useGunRef = () => {
  const gunRef = (key) => {
    return gun.get(key);
  };

  return { gunRef };
};

export default useGunRef;
