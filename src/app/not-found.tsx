import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could Not Find Requested Resource</p><br></br>
      <Link href="/">Click To Return Home</Link>
    </div>
  )
}