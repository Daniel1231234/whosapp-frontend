import spinner from "../../assets/spinner.gif"

export function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        style={{
          width: "100px",
          margin: "auto",
          display: "block",
          backgroundColor: "inherit",
        }}
        alt="Loading..."
      />
    </div>
  )
}