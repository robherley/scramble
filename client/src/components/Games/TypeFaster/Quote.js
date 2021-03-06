import React from 'react';

const Quote = ({ quote, meIndex, oppIndex }) => {
  return (
    <div>
      <table style={{ fontSize: '2em' }}>
        <tbody>
          <tr>
            {quote.split('').map((char, index) => {
              let style = {};
              if (index < meIndex) {
                style.textDecoration = 'underline';
                style.color = 'var(--green)';
              }
              if (index < oppIndex) style.backgroundColor = 'yellow';

              if (char === ' ')
                return (
                  <td key={index} style={style}>
                    &nbsp;
                  </td>
                );
              else
                return (
                  <td key={index} style={style}>
                    {char}
                  </td>
                );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Quote;
