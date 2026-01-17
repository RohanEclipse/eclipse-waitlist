export async function getServerSideProps(ctx) {
    const code = (ctx.params.code || "").toString().trim();
    return {
      redirect: {
        destination: `/?code=${encodeURIComponent(code)}`,
        permanent: false,
      },
    };
  }
  
  export default function InviteRedirect() {
    return null;
  }
  