function VBlock({ children }: { children: any[] }) {
  const childObjects = children.map((child, index) => ({
    id: index,
    value: child,
  }));
  return (
    <table>
      <tbody>
        {childObjects.map((child) => (
          <tr key={child.id}>{child.value}</tr>
        ))}
      </tbody>
    </table>
  );
}

function HBlock({ children }: { children: any[] }) {
  const childObjects = children.map((child, index) => ({
    id: index,
    value: child,
  }));
  return (
    <table>
      <tbody>
        <tr>
          {childObjects.map((child) => (
            <td key={child.id}>{child.value}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export { VBlock, HBlock };
