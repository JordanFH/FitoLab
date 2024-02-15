export default function formatDate(date) {
    const d = new Date(date);
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();

    let hours = d.getHours();
    const minutes = ("0" + d.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return `${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
}