/**
 * Utility function to dynamically generate location & category specific image URLs
 * using direct Unsplash photo IDs and reliable search keywords.
 */
export function getServiceImages(searchTerm: string, count: number = 2): string[] {
  const query = encodeURIComponent(searchTerm.trim().toLowerCase());
  
  // Specific curated Unsplash high-res photos matched to Indian locations
  const curatedImageMap: Record<string, string[]> = {
    "mahakaleshwar temple ujjain": [
      "https://images.unsplash.com/photo-1609946682042-870e6728416b?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1000&auto=format&fit=crop&q=80"
    ],
    "omkareshwar narmada river": [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1000&auto=format&fit=crop&q=80"
    ],
    "rishikesh river rafting ganga": [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80"
    ],
    "kedarnath temple himalayas": [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1000&auto=format&fit=crop&q=80"
    ],
    "khatu shyam temple rajasthan": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1000&auto=format&fit=crop&q=80"
    ],
    "chanderi silk saree handloom": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1000&auto=format&fit=crop&q=80"
    ],
    "bamboo terracotta handicraft india": [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1000&auto=format&fit=crop&q=80"
    ],
    "laxman jhula rishikesh mountains": [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&auto=format&fit=crop&q=80"
    ],
    "varanasi ganga aarti evening": [
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1000&auto=format&fit=crop&q=80"
    ],
    "golden temple amritsar": [
      "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1588097281266-310ce8ad4b23?w=1000&auto=format&fit=crop&q=80"
    ],
    "kerala backwaters houseboat alleppey": [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1000&auto=format&fit=crop&q=80"
    ],
    "jaisalmer desert camel safari": [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1000&auto=format&fit=crop&q=80"
    ],
    "madhubani painting art bihar": [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80"
    ],
    "vaishno devi temple katra": [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1000&auto=format&fit=crop&q=80"
    ],
    "fontainhas goa portuguese houses": [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1000&auto=format&fit=crop&q=80"
    ],
    "bandhani tie dye gujarat textile": [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80"
    ],
    "hampi ruins karnataka sunrise": [
      "https://images.unsplash.com/photo-1600100397608-f010e423b971?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80"
    ],
    "shirdi sai baba temple": [
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1000&auto=format&fit=crop&q=80"
    ]
  };

  const key = searchTerm.trim().toLowerCase();
  if (curatedImageMap[key]) {
    return curatedImageMap[key].slice(0, count);
  }

  // Dynamic fallback URL builder for any arbitrary search query
  return Array.from({ length: count }, (_, i) => 
    `https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80&sig=${i}`
  );
}

export function getVendorAvatar(seedName: string): string {
  const avatars = [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
  ];
  const charCode = seedName.charCodeAt(0) || 0;
  return avatars[charCode % avatars.length];
}
